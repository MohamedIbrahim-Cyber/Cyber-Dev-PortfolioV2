import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

// Load environment variables
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
}
dotenv.config();

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json({ limit: '64kb' }));

// Rate limiter
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const ipRateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

// Cleanup rate limits
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRateLimitMap.entries()) {
    if (now > record.resetAt) {
      ipRateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    webhookConfigured: Boolean(process.env.DISCORD_WEBHOOK_URL),
    timestamp: new Date().toISOString(),
  });
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    // Rate limit check
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const existingRecord = ipRateLimitMap.get(clientIp);

    if (existingRecord) {
      if (now < existingRecord.resetAt) {
        if (existingRecord.count >= MAX_REQUESTS_PER_WINDOW) {
          return res.status(429).json({
            success: false,
            error: 'Too many requests. Please wait a minute before sending another message.',
          });
        }
        existingRecord.count += 1;
      } else {
        ipRateLimitMap.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
      }
    } else {
      ipRateLimitMap.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    }

    // Input validation
    const { name, email, whatsapp, message } = req.body || {};

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Name is required.' });
    }
    if (!email || typeof email !== 'string' || !email.includes('@') || email.trim().length < 3) {
      return res.status(400).json({ success: false, error: 'Valid email address is required.' });
    }
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Message content is required.' });
    }

    // Sanitization
    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedEmail = email.trim().slice(0, 200);
    const sanitizedWhatsapp = typeof whatsapp === 'string' ? whatsapp.trim().slice(0, 50) : '';
    const sanitizedMessage = message.trim().slice(0, 4000);

    // Webhook configuration & resilient delivery
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    let deliveredToWebhook = false;

    if (webhookUrl && webhookUrl.startsWith('http')) {
      try {
        // Discord payload
        const discordPayload = {
          username: 'CyberDev Portfolio Bot',
          avatar_url: 'https://raw.githubusercontent.com/MohamedIbrahim-Cyber/MohamedIbrahim-Cyber/main/avatar.png',
          allowed_mentions: { parse: [] },
          embeds: [
            {
              title: '📬 New Portfolio Contact Submission',
              color: 0xb81d34,
              fields: [
                { name: '👤 Sender Name', value: sanitizedName, inline: true },
                { name: '📧 Sender Email', value: sanitizedEmail, inline: true },
                { name: '📱 WhatsApp', value: sanitizedWhatsapp || 'Not provided', inline: true },
                { name: '💬 Message', value: sanitizedMessage, inline: false },
              ],
              timestamp: new Date().toISOString(),
              footer: { text: 'CyberDev Portfolio • Contact Notification' },
            },
          ],
        };

        // Forward request to webhook
        const discordResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(discordPayload),
          signal: AbortSignal.timeout(8000),
        });

        if (discordResponse.ok || discordResponse.status === 204) {
          deliveredToWebhook = true;
          console.log(`[Contact Form] Dispatched message from "${sanitizedName}" (${sanitizedEmail}) to Discord webhook successfully.`);
        } else {
          console.warn(`[Contact Form] Discord webhook responded with status ${discordResponse.status}. Message logged locally.`);
        }
      } catch (webhookErr: any) {
        console.warn(`[Contact Form] Webhook delivery failed: ${webhookErr?.message || webhookErr}. Message logged locally.`);
      }
    } else {
      console.log(`[Contact Form] Received message from "${sanitizedName}" (${sanitizedEmail}) [WhatsApp: ${sanitizedWhatsapp || 'N/A'}]:\n"${sanitizedMessage}"`);
    }

    // Always succeed and confirm receipt so the user never gets an unhelpful error
    return res.status(200).json({
      success: true,
      deliveredToWebhook,
      message: 'Your message has been received successfully! I will get back to you shortly.',
    });
  } catch (error: any) {
    if (error?.name === 'TimeoutError') {
      console.error('[API Error] Discord webhook request timed out.');
      return res.status(504).json({
        success: false,
        error: 'Delivery request timed out. Please try again.',
      });
    }

    console.error('[API Error] Unexpected error processing contact submission:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your request.',
    });
  }
});

// Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server securely running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

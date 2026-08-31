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

    // Webhook configuration
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('[API Configuration Error] DISCORD_WEBHOOK_URL is not set in server environment variables.');
      return res.status(500).json({
        success: false,
        error: 'Contact delivery service is temporarily unconfigured on the server.',
      });
    }

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
          footer: { text: 'CyberDev Portfolio • Secure Server Proxy' },
        },
      ],
    };

    // Forward request
    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordPayload),
      signal: AbortSignal.timeout(8000),
    });

    if (discordResponse.ok || discordResponse.status === 204) {
      return res.status(200).json({
        success: true,
        message: 'Message dispatched successfully.',
      });
    }

    if (discordResponse.status === 429) {
      console.warn('[API Warning] Discord webhook upstream rate limit triggered.');
      return res.status(429).json({
        success: false,
        error: 'High message volume. Please wait a moment and try again.',
      });
    }

    console.error(`[API Error] Discord webhook returned HTTP ${discordResponse.status}`);
    return res.status(502).json({
      success: false,
      error: 'Unable to deliver message to destination service.',
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

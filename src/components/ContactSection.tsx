import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Copy, Check, Send, Github, Linkedin, MessageCircle } from 'lucide-react';
import { translations, Language } from '../data/translations';

interface ContactSectionProps {
  currentLang: Language;
  initialMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang, initialMessage = '' }) => {
  const t = translations[currentLang];
  const c = t.contact;
  const isRtl = currentLang === 'ar';

  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const contactEmail = 'cyberdevbusines@gmail.com';
  const whatsappNumber = '+201110295074';

  useEffect(() => {
    if (initialMessage) {
      setFormData(prev => ({ ...prev, message: initialMessage }));
      const messageInput = document.getElementById('contact-message');
      if (messageInput) {
        messageInput.focus();
      }
    }
  }, [initialMessage]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(whatsappNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const whatsapp = formData.whatsapp.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setStatus('error');
      setErrorMessage(isRtl ? 'يرجى ملء جميع الحقول المطلوبة (الاسم، البريد، والرسالة).' : 'Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    setStatus('sending');
    setErrorMessage(null);

    const payload = { name, email, whatsapp, message };

    try {
      // 1. Primary: Try server backend endpoint (/api/contact)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let serverError = '';
      if (response.ok) {
        const result = await response.json().catch(() => null);
        if (result?.success !== false) {
          setStatus('success');
          setFormData({ name: '', email: '', whatsapp: '', message: '' });
          return;
        } else if (result?.error) {
          serverError = result.error;
        }
      } else {
        try {
          const errJson = await response.json();
          if (errJson?.error) serverError = errJson.error;
        } catch {
          // Ignore JSON parse error
        }
      }

      // 2. Secondary Fallback: Direct Discord Webhook call
      const clientWebhookUrl =
        (import.meta as any).env?.VITE_DISCORD_WEBHOOK_URL ||
        'https://discord.com/api/webhooks/1543829053692444743/oivSH9dpk89IAl8cp-zIpfEUruXR1oJBMfS8roO2xUI1kgaHwFnIVIb1tDrlE0KLXvZi';
      if (clientWebhookUrl && typeof clientWebhookUrl === 'string' && clientWebhookUrl.startsWith('http')) {
        const discordPayload = {
          username: 'CyberDev Portfolio Bot',
          avatar_url: 'https://raw.githubusercontent.com/MohamedIbrahim-Cyber/MohamedIbrahim-Cyber/main/avatar.png',
          embeds: [
            {
              title: '📬 New Portfolio Contact Submission (Direct Webhook)',
              color: 0xb81d34,
              fields: [
                { name: '👤 Sender Name', value: name, inline: true },
                { name: '📧 Sender Email', value: email, inline: true },
                { name: '📱 WhatsApp', value: whatsapp || 'Not provided', inline: true },
                { name: '💬 Message', value: message, inline: false },
              ],
              timestamp: new Date().toISOString(),
              footer: { text: 'CyberDev Portfolio • Direct Webhook' },
            },
          ],
        };

        const directRes = await fetch(clientWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(discordPayload),
        });

        if (directRes.ok || directRes.status === 204) {
          setStatus('success');
          setFormData({ name: '', email: '', whatsapp: '', message: '' });
          return;
        }
      }

      // If both failed, display clear error message with instant email & WhatsApp actions
      setStatus('error');
      setErrorMessage(
        serverError ||
          (isRtl
            ? 'تعذر إرسال الرسالة تلقائياً. يمكنك الإرسال مباشرة عبر البريد أو واتساب:'
            : 'Unable to deliver message automatically. You can send directly via Email or WhatsApp below:')
      );
    } catch {
      // Network Exception Fallback: Try direct client webhook
      const clientWebhookUrl =
        (import.meta as any).env?.VITE_DISCORD_WEBHOOK_URL ||
        'https://discord.com/api/webhooks/1543829053692444743/oivSH9dpk89IAl8cp-zIpfEUruXR1oJBMfS8roO2xUI1kgaHwFnIVIb1tDrlE0KLXvZi';
      if (clientWebhookUrl && typeof clientWebhookUrl === 'string' && clientWebhookUrl.startsWith('http')) {
        try {
          const discordPayload = {
            username: 'CyberDev Portfolio Bot',
            avatar_url: 'https://raw.githubusercontent.com/MohamedIbrahim-Cyber/MohamedIbrahim-Cyber/main/avatar.png',
            embeds: [
              {
                title: '📬 New Portfolio Contact Submission (Fallback Webhook)',
                color: 0xb81d34,
                fields: [
                  { name: '👤 Sender Name', value: name, inline: true },
                  { name: '📧 Sender Email', value: email, inline: true },
                  { name: '📱 WhatsApp', value: whatsapp || 'Not provided', inline: true },
                  { name: '💬 Message', value: message, inline: false },
                ],
                timestamp: new Date().toISOString(),
                footer: { text: 'CyberDev Portfolio • Fallback Webhook' },
              },
            ],
          };

          const directRes = await fetch(clientWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload),
          });

          if (directRes.ok || directRes.status === 204) {
            setStatus('success');
            setFormData({ name: '', email: '', whatsapp: '', message: '' });
            return;
          }
        } catch {
          // ignore fallback error
        }
      }

      setStatus('error');
      setErrorMessage(
        isRtl
          ? 'تعذر الاتصال بالخادم. يمكنك إرسال رسالتك مباشرة عبر البريد أو واتساب:'
          : 'Could not reach server endpoint. You can send your message directly via Email or WhatsApp:'
      );
    }
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nWhatsApp: ${formData.whatsapp || 'N/A'}\n\nMessage:\n${formData.message}`
    );
    return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello Mohamed, my name is ${formData.name || 'a visitor'} (${formData.email || 'no email'}).\n\n${formData.message}`
    );
    return `https://wa.me/201110295074?text=${text}`;
  };

  return (
    <section 
      id="Contact" 
      aria-labelledby="contact-heading"
      className="w-full py-12 sm:py-16 scroll-mt-24 flex flex-col gap-8 overflow-hidden"
    >
      {/* Section header */}
      <div className="pb-4 border-b border-[var(--border)]">
        <motion.h2 
          id="contact-heading" 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-header font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight"
        >
          {c.title}
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column */}
        <motion.div 
          initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 surface-card spotlight-card rounded-3xl p-7 sm:p-9 flex flex-col justify-between gap-8"
        >
          <div className="flex flex-col gap-5">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider w-fit"
            >
              {c.directContact}
            </motion.div>

            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-header font-bold text-xl sm:text-2xl text-[var(--text-primary)] leading-snug"
            >
              {c.heading}
            </motion.h3>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
            >
              {c.description}
            </motion.p>
          </div>

          <div className="flex flex-col gap-5 pt-4 border-t border-[var(--border)]">
            {/* Email item */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-[var(--text-secondary)] font-semibold">
                {c.emailLabel}
              </span>
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)]">
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-mono text-xs text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors truncate px-2"
                >
                  {contactEmail}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="px-3 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">{c.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>{c.copy}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* WhatsApp item */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-[var(--text-secondary)] font-semibold">
                {c.whatsappLabel}
              </span>
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)]">
                <a
                  href="https://wa.me/201110295074"
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="font-mono text-xs text-[var(--text-primary)] hover:text-[#25D366] transition-colors truncate px-2 flex items-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>{whatsappNumber}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  aria-label="Copy WhatsApp number"
                  className="px-3 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[#25D366] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">{c.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>{c.copy}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-[var(--text-secondary)] font-semibold">
                {c.socialProfiles}
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {/* WhatsApp button */}
                <a
                  href="https://wa.me/201110295074"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp (+201110295074)"
                  className="px-3.5 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] hover:border-[#25D366] hover:text-[#25D366] text-xs font-semibold flex items-center gap-2 transition-colors group shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                  <span>WhatsApp</span>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/MohamedIbrahim-Cyber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form column */}
        <motion.div 
          initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 surface-card rounded-3xl p-7 sm:p-9"
        >
          {status === 'success' ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="font-header font-bold text-xl text-[var(--text-primary)]">
                {c.sentSuccessTitle}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] max-w-sm">
                {c.sentSuccessDesc}
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-2 px-5 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold hover:border-[var(--accent)] transition-colors"
              >
                {c.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-header font-bold text-xl text-[var(--text-primary)]"
              >
                {c.sendMessage}
              </motion.h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-xs font-medium text-[var(--text-secondary)]">
                    {c.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={c.namePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text-primary)] focus:border-[var(--accent)] transition-colors focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-xs font-medium text-[var(--text-secondary)]">
                    {c.emailInputLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={c.emailPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text-primary)] focus:border-[var(--accent)] transition-colors focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-whatsapp" className="text-xs font-medium text-[var(--text-secondary)]">
                  {c.whatsappLabel}
                </label>
                <input
                  id="contact-whatsapp"
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder={c.whatsappPlaceholder}
                  dir="ltr"
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text-primary)] focus:border-[var(--accent)] transition-colors focus:outline-none placeholder:text-left text-left"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-xs font-medium text-[var(--text-secondary)]">
                  {c.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={c.messagePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text-primary)] focus:border-[var(--accent)] transition-colors focus:outline-none resize-none"
                />
              </div>

              {errorMessage && (
                <div className="p-4 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-300 text-xs flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="leading-relaxed">{errorMessage}</span>
                    <button
                      type="button"
                      onClick={() => setErrorMessage(null)}
                      className="text-red-400 hover:text-red-200 font-bold px-1"
                      aria-label="Dismiss error"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href={getMailtoUrl()}
                      className="px-3 py-1.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--accent)] text-[var(--text-primary)] hover:text-white border border-[var(--border)] font-semibold text-[11px] flex items-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      <span>{isRtl ? 'إرسال عبر البريد الإلكتروني' : 'Send via Email App'}</span>
                    </a>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[var(--surface)] hover:bg-[#25D366] text-[var(--text-primary)] hover:text-white border border-[var(--border)] font-semibold text-[11px] flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3 h-3 text-[#25D366] group-hover:text-white" />
                      <span>{isRtl ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}</span>
                    </a>
                  </div>
                </div>
              )}

              <button
                type="submit"
                id="contact-submit-btn"
                disabled={status === 'sending'}
                className="w-full sm:w-auto self-start px-7 py-3 rounded-full bg-[var(--accent)] text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[var(--accent-hover)] transition-all shadow-md disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{status === 'sending' ? 'Sending...' : c.sendButton}</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Copy, Check, Send, Github, Linkedin, MessageSquare } from 'lucide-react';
import { translations, Language } from '../data/translations';

interface ContactSectionProps {
  currentLang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const t = translations[currentLang];
  const c = t.contact;
  const isRtl = currentLang === 'ar';

  const email = 'mohamedar100x@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section 
      id="Contact" 
      aria-labelledby="contact-heading"
      className="w-full py-12 sm:py-16 scroll-mt-24 flex flex-col gap-8 overflow-hidden"
    >
      <div className="flex flex-col gap-2 pb-4 border-b border-[var(--border)]">
        <motion.h2 
          id="contact-heading" 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-header font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight"
        >
          {c.title}
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info & Quick Copy (Slides in from Left) */}
        <motion.div 
          initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="surface-card rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase font-bold text-[var(--accent)]">
                {c.directContact}
              </span>
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-header font-bold text-xl text-[var(--text-primary)]"
              >
                {c.heading}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-1"
              >
                {c.description}
              </motion.p>
            </div>

            {/* Email Copy Card */}
            <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col overflow-hidden text-start">
                  <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">
                    {c.emailLabel}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-[var(--text-primary)] font-semibold truncate">
                    {email}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span className="text-[var(--accent)] font-bold">{c.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{c.copy}</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Links Grid */}
            <div className="flex flex-col gap-3 pt-2">
              <span className="font-mono text-xs uppercase font-bold text-[var(--text-secondary)]">
                {c.socialProfiles}
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://github.com/MohamedIbrahim-Cyber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center gap-2.5 text-xs font-semibold transition-all group"
                >
                  <Github className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent)]" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center gap-2.5 text-xs font-semibold transition-all group"
                >
                  <Linkedin className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent)]" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Message Form (Slides in from Right) */}
        <motion.div 
          initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="surface-card rounded-3xl p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-14 h-14 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-header font-bold text-xl text-[var(--text-primary)]">
                  {c.sentSuccessTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md">
                  {c.sentSuccessDesc}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="mt-4 px-6 py-2 rounded-full border border-[var(--border)] hover:border-[var(--accent)] text-xs font-semibold transition-colors"
                >
                  {c.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)]">
                  <MessageSquare className="w-4 h-4 text-[var(--accent)]" />
                  <span className="font-header font-bold text-sm text-[var(--text-primary)]">
                    {c.sendMessage}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name input */}
                  <div className="flex flex-col gap-1.5 text-start">
                    <label htmlFor="contact-name" className="text-xs font-mono font-semibold text-[var(--text-secondary)]">
                      {c.nameLabel} <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={c.namePlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] text-xs sm:text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                  </div>

                  {/* Email input */}
                  <div className="flex flex-col gap-1.5 text-start">
                    <label htmlFor="contact-email" className="text-xs font-mono font-semibold text-[var(--text-secondary)]">
                      {c.emailInputLabel} <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={c.emailPlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] text-xs sm:text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                  </div>
                </div>

                {/* Message input */}
                <div className="flex flex-col gap-1.5 text-start">
                  <label htmlFor="contact-message" className="text-xs font-mono font-semibold text-[var(--text-secondary)]">
                    {c.messageLabel} <span className="text-[var(--accent)]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={c.messagePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] text-xs sm:text-sm focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-6 rounded-2xl bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  <span>{c.sendButton}</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

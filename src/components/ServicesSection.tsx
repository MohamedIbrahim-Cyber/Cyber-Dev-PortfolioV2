import React from 'react';
import { motion } from 'motion/react';
import { Layout, Globe, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { translations, Language } from '../data/translations';

interface ServicesSectionProps {
  currentLang: Language;
  onSelectService?: (inquiryMessage: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ currentLang, onSelectService }) => {
  const t = translations[currentLang];
  const s = t.services;
  const isRtl = currentLang === 'ar';

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      default: return <Layout className="w-5 h-5" />;
    }
  };

  const handleServiceClick = (inquiryMessage: string) => {
    if (onSelectService) {
      onSelectService(inquiryMessage);
    }
    const contactElement = document.getElementById('Contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="Services" 
      aria-labelledby="services-heading"
      className="w-full py-12 sm:py-16 scroll-mt-24 flex flex-col gap-8 overflow-hidden"
    >
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[var(--border)]">
        <motion.h2 
          id="services-heading" 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-header font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight"
        >
          {s.title}
        </motion.h2>

        <a
          href="#Contact"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors group"
        >
          <span>{s.discussProject}</span>
          <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
        </a>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {s.items.map((item, idx) => {
          const xOffset = idx === 0 ? (isRtl ? 50 : -50) : idx === 2 ? (isRtl ? -50 : 50) : 0;
          const yOffset = idx === 1 ? 30 : 0;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: xOffset, y: yOffset }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleServiceClick(item.inquiryMessage)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleServiceClick(item.inquiryMessage);
                }
              }}
              id={`service-card-${item.id}`}
              className="service-glow-card spotlight-card group rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-6 cursor-pointer hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-start"
            >
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:shadow-[0_0_18px_rgba(184,29,52,0.45)] transition-all duration-300">
                  {renderIcon(item.iconName)}
                </div>

                <motion.h3 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="font-header font-bold text-lg sm:text-xl text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent)] transition-colors"
                >
                  {item.title}
                </motion.h3>

                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                >
                  {item.description}
                </motion.p>
              </div>

              {/* Deliverables */}
              <div className="pt-4 border-t border-[var(--border)] flex flex-col gap-3.5">
                <div className="flex flex-col gap-2">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] font-semibold"
                  >
                    {s.deliverablesLabel}
                  </motion.span>
                  <div className="flex flex-col gap-2">
                    {item.deliverables.map((deliv, dIdx) => (
                      <motion.div 
                        key={deliv}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.05 * dIdx }}
                        className="flex items-center gap-2 text-xs text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 group-hover:scale-110 transition-transform" />
                        <span>{deliv}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Inquire button */}
                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-[var(--accent)] group-hover:text-[var(--accent-hover)] transition-colors border-t border-[var(--border)]/60">
                  <span>{s.clickToInquire}</span>
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1.5 ${isRtl ? 'rotate-180 group-hover:-translate-x-1.5' : ''}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

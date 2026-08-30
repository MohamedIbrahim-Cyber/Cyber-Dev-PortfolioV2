import React from 'react';
import { motion } from 'motion/react';
import { Layout, Cpu, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import { translations, Language } from '../data/translations';

interface ServicesSectionProps {
  currentLang: Language;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Layout': return <Layout className="w-5 h-5 text-[var(--accent)]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[var(--accent)]" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-[var(--accent)]" />;
      default: return <Layout className="w-5 h-5 text-[var(--accent)]" />;
    }
  };

  return (
    <section 
      id="Services" 
      aria-labelledby="services-heading"
      className="w-full py-12 sm:py-16 scroll-mt-24 flex flex-col gap-8 overflow-hidden"
    >
      <div className="flex flex-col gap-2 pb-4 border-b border-[var(--border)]">
        <motion.h2 
          id="services-heading" 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-header font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight"
        >
          {t.services.title}
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {t.services.items.map((service, idx) => {
          const xOffset = idx === 0 ? (isRtl ? 50 : -50) : idx === 2 ? (isRtl ? -50 : 50) : 0;
          const yOffset = idx === 1 ? 30 : 0;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: xOffset, y: yOffset }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="surface-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[var(--accent-subtle)] border border-[var(--border)] flex items-center justify-center">
                  {renderIcon(service.iconName)}
                </div>

                <div>
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="font-header font-bold text-lg text-[var(--text-primary)] leading-snug"
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed"
                  >
                    {service.description}
                  </motion.p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    {t.services.deliverablesLabel}
                  </span>
                  <ul className="flex flex-col gap-1.5">
                    {service.deliverables.map((item, dIdx) => (
                      <motion.li 
                        key={item} 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.05 * dIdx }}
                        className="flex items-center gap-2 text-xs text-[var(--text-secondary)]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)]">
                <a
                  href="#Contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  <span>{t.services.discussProject}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

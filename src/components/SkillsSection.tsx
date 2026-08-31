import React from 'react';
import { motion } from 'motion/react';
import { Code, Layout, Terminal, Sparkles } from 'lucide-react';
import { translations, Language } from '../data/translations';

interface SkillsSectionProps {
  currentLang: Language;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const s = t.skills;
  const isRtl = currentLang === 'ar';

  const renderIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Code className="w-5 h-5" />;
      case 1: return <Layout className="w-5 h-5" />;
      case 2: return <Terminal className="w-5 h-5" />;
      case 3: return <Sparkles className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
    }
  };

  return (
    <section 
      id="Skills" 
      aria-labelledby="skills-heading"
      className="w-full py-12 sm:py-16 scroll-mt-24 flex flex-col gap-8 overflow-hidden"
    >
      {/* Section header */}
      <div className="pb-4 border-b border-[var(--border)]">
        <motion.h2 
          id="skills-heading" 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-header font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight"
        >
          {s.title}
        </motion.h2>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {s.categories.map((cat, idx) => {
          // Offsets
          const isLeft = idx % 2 === 0;
          const xOffset = isLeft ? (isRtl ? 50 : -50) : (isRtl ? -50 : 50);

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: xOffset }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-6 border spotlight-card transition-all duration-300 ${
                cat.isFocus
                  ? 'bg-[var(--surface)] border-[var(--accent)] shadow-md hover:shadow-lg'
                  : 'surface-card bg-[var(--surface)] border-[var(--border)] shadow-sm hover:border-[var(--accent)] hover:shadow-md'
              }`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center">
                      {renderIcon(idx)}
                    </div>
                    <motion.h3 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="font-header font-bold text-lg sm:text-xl text-[var(--text-primary)]"
                    >
                      {cat.title}
                    </motion.h3>
                  </div>

                  {cat.isFocus && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent)] text-white text-[11px] font-mono font-semibold shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      {s.activeDeepDive}
                    </motion.span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills.map((skill, sIdx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 * sIdx }}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                        cat.isFocus
                          ? 'bg-[var(--accent-subtle)] text-[var(--accent)] font-semibold border border-[var(--accent)]/30'
                          : 'bg-[var(--bg)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Code, Layout, Terminal, Flame } from 'lucide-react';
import { translations, Language } from '../data/translations';

interface SkillsSectionProps {
  currentLang: Language;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  const getCategoryIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Code className="w-4 h-4 text-[var(--accent)]" />;
      case 1: return <Layout className="w-4 h-4 text-[var(--accent)]" />;
      case 2: return <Terminal className="w-4 h-4 text-[var(--accent)]" />;
      case 3: return <Flame className="w-4 h-4 text-[var(--accent)]" />;
      default: return <Code className="w-4 h-4 text-[var(--accent)]" />;
    }
  };

  return (
    <section 
      id="Skills" 
      aria-labelledby="skills-heading"
      className="w-full py-12 sm:py-16 scroll-mt-24 flex flex-col gap-8 overflow-hidden"
    >
      <div className="flex flex-col gap-2 pb-4 border-b border-[var(--border)]">
        <motion.h2 
          id="skills-heading" 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-header font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight"
        >
          {t.skills.title}
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {t.skills.categories.map((category, idx) => {
          const isLeft = idx % 2 === 0;
          const xOffset = isLeft ? (isRtl ? 50 : -50) : (isRtl ? -50 : 50);

          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: xOffset }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (idx % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`surface-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6 ${
                category.isFocus
                  ? 'border-2 border-[var(--accent)]'
                  : ''
              }`}
            >
              <div className="flex flex-col gap-4">
                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[var(--accent-subtle)] border border-[var(--border)] flex items-center justify-center">
                      {getCategoryIcon(idx)}
                    </div>
                    <motion.h3 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className={`font-header font-bold text-base sm:text-lg ${category.isFocus ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}
                    >
                      {category.title}
                    </motion.h3>
                  </div>

                  {category.isFocus && (
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent)]" />
                      </span>
                      <span className="font-mono text-[10px] uppercase font-bold text-[var(--accent)] tracking-wider hidden sm:inline">
                        {t.skills.activeDeepDive}
                      </span>
                    </div>
                  )}
                </div>

                {/* Skills Tags Container - Text elements fading in */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {category.skills.map((skill, sIdx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 * sIdx }}
                      className={`font-mono text-xs px-3.5 py-1.5 rounded-full border transition-colors ${
                        category.isFocus
                          ? 'bg-[var(--accent-subtle)] border-[var(--accent)] text-[var(--text-primary)] font-medium'
                          : 'bg-[var(--bg)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]'
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

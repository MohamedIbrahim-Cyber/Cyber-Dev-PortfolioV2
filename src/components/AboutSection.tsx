import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Cpu, Layers, Sparkles, Code2 } from 'lucide-react';
import { translations, Language } from '../data/translations';

interface AboutSectionProps {
  currentLang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  const renderIcon = (type: string) => {
    switch (type) {
      case 'edu': return <GraduationCap className="w-5 h-5" />;
      case 'cpu': return <Cpu className="w-5 h-5" />;
      case 'ui': return <Layers className="w-5 h-5" />;
      case 'ethos': return <Sparkles className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section 
      id="About" 
      aria-labelledby="about-heading"
      className="w-full py-12 sm:py-16 scroll-mt-24 flex flex-col gap-10 overflow-hidden"
    >
      {/* Top 3 Stats Row: Left card slides from left, center from bottom, right from right */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {t.about.stats.map((stat, idx) => {
          // Alternating directions: Left card from left, center with delay, right card from right
          const xOffset = idx === 0 ? (isRtl ? 50 : -50) : idx === 2 ? (isRtl ? -50 : 50) : 0;
          const yOffset = idx === 1 ? 30 : 0;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: xOffset, y: yOffset }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col items-center justify-center text-center gap-2 border spotlight-card transition-all duration-300 ${
                stat.isAccent
                  ? 'bg-[var(--accent)] text-white border-transparent shadow-md'
                  : 'surface-card bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:shadow-md'
              }`}
            >
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                className={`font-header font-bold text-4xl sm:text-5xl tracking-tight leading-none ${stat.isAccent ? 'text-white' : 'text-[var(--accent)]'}`}
              >
                {stat.value}
              </motion.span>
              <div className={`w-12 h-0.5 my-1 rounded-full ${stat.isAccent ? 'bg-white/40' : 'bg-[var(--border)]'}`} />
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.1 }}
                className="font-header font-bold text-sm sm:text-base"
              >
                {stat.label}
              </motion.span>
              {stat.subtitle && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  className={`text-xs ${stat.isAccent ? 'text-white/80' : 'text-[var(--text-secondary)]'}`}
                >
                  {stat.subtitle}
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Main Bento: Left Mosaic (Sliding from Left) + Right Bio (Sliding from Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: 2-Column Mosaic - Slides from Left */}
        <motion.div 
          initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 grid grid-cols-2 gap-4"
        >
          {/* Mosaic Col 1 */}
          <div className="flex flex-col gap-4">
            {t.about.mosaic.slice(0, 2).map((item, idx) => (
              <div key={idx} className="mosaic-glow-card spotlight-card group rounded-3xl p-5 sm:p-6 flex flex-col gap-3 justify-between cursor-default">
                <div className="w-9 h-9 rounded-xl bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(184,29,52,0.45)] group-hover:scale-105 transition-all duration-300">
                  {renderIcon(item.iconType)}
                </div>
                <div>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold"
                  >
                    {item.tag}
                  </motion.span>
                  <motion.h4 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="font-header font-bold text-sm sm:text-base text-[var(--text-primary)] leading-snug mt-0.5 group-hover:text-[var(--accent)] transition-colors"
                  >
                    {item.title}
                  </motion.h4>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed"
                  >
                    {item.desc}
                  </motion.p>
                </div>
              </div>
            ))}
          </div>

          {/* Mosaic Col 2 */}
          <div className="flex flex-col gap-4">
            {t.about.mosaic.slice(2, 4).map((item, idx) => (
              <div key={idx} className="mosaic-glow-card spotlight-card group rounded-3xl p-5 sm:p-6 flex flex-col gap-3 justify-between cursor-default">
                <div className="w-9 h-9 rounded-xl bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(184,29,52,0.45)] group-hover:scale-105 transition-all duration-300">
                  {renderIcon(item.iconType)}
                </div>
                <div>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-semibold"
                  >
                    {item.tag}
                  </motion.span>
                  <motion.h4 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="font-header font-bold text-sm sm:text-base text-[var(--text-primary)] leading-snug mt-0.5 group-hover:text-[var(--accent)] transition-colors"
                  >
                    {item.title}
                  </motion.h4>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed"
                  >
                    {item.desc}
                  </motion.p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Rich Bio Card - Slides from Right */}
        <motion.div 
          initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 surface-card spotlight-card rounded-3xl p-7 sm:p-9 flex flex-col justify-between gap-6"
        >
          <div className="flex flex-col gap-4">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider w-fit"
            >
              {t.about.badge}
            </motion.div>

            <motion.h2 
              id="about-heading" 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-header font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight"
            >
              {t.about.title}
              <span className="text-[var(--accent)]">{t.about.titleAccent}</span>
            </motion.h2>

            <div className="flex flex-col gap-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {t.about.bioP1}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                {t.about.bioP2}
              </motion.p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-secondary)]"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              {t.about.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[var(--accent)]" />
              {t.about.focus}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

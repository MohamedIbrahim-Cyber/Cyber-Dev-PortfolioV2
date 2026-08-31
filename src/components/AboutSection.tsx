import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Cpu, Layers, Sparkles, Code2, Film } from 'lucide-react';
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
      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {t.about.stats.map((stat, idx) => {
          // Stat offsets
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

      {/* Bento layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left bento */}
        <motion.div 
          initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Left column */}
          <div className="flex flex-col gap-4">
            {/* Hardware pill */}
            <div 
              id="about-pill-left-top"
              className="min-h-[72px] sm:min-h-[76px] rounded-[22px] bg-[var(--accent)] text-white shadow-md flex items-center gap-3.5 px-4 sm:px-5 py-3 transition-all duration-300 hover:brightness-110 group select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-black/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-header font-bold text-xs sm:text-sm tracking-wide text-white leading-snug">
                  {t.about.hardwareInterest}
                </span>
                <span className="text-[11px] text-white/80 font-mono leading-tight mt-0.5">
                  {t.about.hardwareInterestDesc}
                </span>
              </div>
            </div>

            {/* Artwork card */}
            <div 
              id="about-card-shadow"
              className="relative min-h-[380px] sm:min-h-[420px] flex-1 rounded-[28px] overflow-hidden border border-[#b81d34]/40 bg-[#0f1412] shadow-lg group flex flex-col justify-end"
            >
              {/* Artwork image */}
              <img 
                src="/shadow-card.png"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop";
                }}
                alt="Shadow Character Artwork"
                id="about-shadow-photo"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {/* Campus photo */}
            <div 
              id="about-card-campus"
              className="relative h-48 sm:h-52 rounded-[28px] overflow-hidden border border-[var(--border)] bg-[#121517] shadow-md group"
            >
              <img 
                src="/sun-card.jpg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop";
                }}
                alt="Campus Sunset Sky"
                id="about-campus-photo"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Video pill */}
            <div 
              id="about-pill-right-mid"
              className="min-h-[72px] sm:min-h-[76px] rounded-[22px] bg-[var(--accent)] text-white shadow-md flex items-center gap-3.5 px-4 sm:px-5 py-3 transition-all duration-300 hover:brightness-110 group select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-black/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Film className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-header font-bold text-xs sm:text-sm tracking-wide text-white leading-snug">
                  {t.about.videoInterest}
                </span>
                <span className="text-[11px] text-white/80 font-mono leading-tight mt-0.5">
                  {t.about.videoInterestDesc}
                </span>
              </div>
            </div>

            {/* Edu stats card */}
            <div 
              id="about-card-edu-years"
              className="flex-1 min-h-[140px] rounded-[28px] p-6 flex flex-col items-center justify-center text-center gap-1.5 border border-[var(--border)] bg-[#17191b] shadow-md hover:border-[var(--accent)] transition-all duration-300 group cursor-default"
            >
              <span className="font-header font-bold text-4xl sm:text-5xl text-[var(--accent)] tracking-tight group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(184,29,52,0.35)]">
                +2
              </span>
              <span className="font-mono text-xs sm:text-sm text-[var(--accent)] font-semibold tracking-wide">
                {currentLang === 'ar' ? 'سنوات الدراسة' : 'Edu. Years'}
              </span>
              <span className="text-[11px] text-[var(--text-secondary)] font-mono">
                {currentLang === 'ar' ? 'حاسبات وذكاء اصطناعي • جامعة كابيتال' : 'Computer Science • Capital University'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right bio card */}
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

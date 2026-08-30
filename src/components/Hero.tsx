import React from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { TerminalCard } from './TerminalCard';
import { translations, Language } from '../data/translations';

interface HeroProps {
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  return (
    <section 
      id="hero-section" 
      aria-label="Introduction"
      className="w-full pt-28 pb-12 sm:pt-36 sm:pb-16 flex flex-col items-center overflow-hidden"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Heading & CTAs (Sliding in from Left side, text fading in) */}
        <motion.div 
          initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col gap-6 text-start"
        >
          {/* Main Title - Text Fading In */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-header font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[var(--text-primary)] tracking-tight leading-[1.15]"
          >
            {t.hero.titlePrefix}
            <span className="text-[var(--accent)]">{t.hero.titleAccent}</span>
            {t.hero.titleSuffix}
          </motion.h1>

          {/* Subtitle - Text Fading In */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl"
          >
            {t.hero.subtitleP1}
            <strong className="text-[var(--text-primary)] font-semibold">{t.hero.subtitleName}</strong>
            {t.hero.subtitleP2}
          </motion.p>

          {/* Action Buttons & Socials - Text Fading In */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#Projects"
              id="hero-explore-btn"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>{t.hero.exploreBtn}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </a>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/MohamedIbrahim-Cyber"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mohamed Ibrahim on GitHub"
                className="w-11 h-11 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-0.5 transition-all shadow-sm"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mohamed Ibrahim on LinkedIn"
                className="w-11 h-11 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-0.5 transition-all shadow-sm"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href="mailto:mohamedar100x@gmail.com"
                aria-label="Send email to Mohamed Ibrahim"
                className="w-11 h-11 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-0.5 transition-all shadow-sm"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Terminal Component (Sliding in from Right side) */}
        <motion.div 
          initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 w-full flex justify-center"
        >
          <TerminalCard currentLang={currentLang} />
        </motion.div>
      </div>
    </section>
  );
};

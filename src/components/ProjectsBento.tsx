import React from 'react';
import { motion } from 'motion/react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ExternalLink, Github, ArrowUpRight, Cpu, Layers } from 'lucide-react';
import { translations, Language } from '../data/translations';

interface ProjectsBentoProps {
  currentLang: Language;
}

export const ProjectsBento: React.FC<ProjectsBentoProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const p = t.projects;
  const isRtl = currentLang === 'ar';

  return (
    <section 
      id="Projects" 
      aria-labelledby="projects-heading"
      className="w-full py-12 sm:py-16 scroll-mt-24 flex flex-col gap-8 overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[var(--border)]">
        <div>
          <motion.h2 
            id="projects-heading" 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-header font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight"
          >
            {p.title}
          </motion.h2>
        </div>

        <a
          href="https://github.com/MohamedIbrahim-Cyber"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group"
        >
          <span>{p.viewGithub}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Bento Grid: Cards slide in from Left/Right, text fades in */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project 1: Featured 2-Column Span Card (Slides in from Left) */}
        <motion.article 
          id="project-course-organizer"
          initial={{ opacity: 0, x: isRtl ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2 lg:col-span-2 relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[420px] flex flex-col justify-between p-6 sm:p-8 border border-[var(--border)] shadow-md group interactive-project-card"
        >
          {/* Background Image Layer with Scrim Overlay */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={PROJECTS_DATA[0].image}
              alt="Course Organizer Preview"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Multi-stop High Contrast Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/35 backdrop-blur-[1px]" />
          </div>

          {/* Top Row: Tags & External Live Demo Circle */}
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {p.items[0].tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-black/70 border border-white/20 text-white font-medium text-[11px] backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            {PROJECTS_DATA[0].liveUrl && (
              <a
                href={PROJECTS_DATA[0].liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Course Organizer Live Demo"
                className="w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-[var(--accent)] hover:border-transparent transition-all shadow-md group-hover:rotate-45"
              >
                <ArrowUpRight className="w-5 h-5" />
              </a>
            )}
          </div>

          {/* Bottom Content: Title, Description, and Actions - Text Fading In */}
          <div className="relative z-10 flex flex-col gap-3 mt-12">
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-header font-bold text-xl sm:text-3xl text-white tracking-tight leading-snug"
            >
              {p.items[0].title}
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl"
            >
              {p.items[0].description}
            </motion.p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href={PROJECTS_DATA[0].liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-white font-semibold text-xs hover:bg-[var(--accent-hover)] transition-all shadow-md"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{p.liveDemo}</span>
              </a>

              <a
                href={PROJECTS_DATA[0].githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all backdrop-blur-sm"
              >
                <Github className="w-3.5 h-3.5" />
                <span>{p.githubRepo}</span>
              </a>
            </div>
          </div>
        </motion.article>

        {/* Project 2: FastPath C++ Memory Allocator (Slides in from Right) */}
        <motion.article 
          id="project-c-allocator"
          initial={{ opacity: 0, x: isRtl ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="interactive-project-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-5"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {p.items[1].tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text-secondary)] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={PROJECTS_DATA[1].githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View FastPath Allocator on GitHub"
                className="w-9 h-9 rounded-full border border-[var(--border)] text-[var(--text-secondary)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>

            {/* Embedded Terminal Benchmark Preview */}
            <div dir="ltr" className="rounded-xl bg-[var(--bg)] p-3.5 border border-[var(--border)] font-mono text-[11px] text-[var(--text-secondary)] flex flex-col gap-1 text-left">
              <div className="flex items-center gap-1 text-[var(--accent)] font-semibold">
                <span>$</span>
                <span className="text-[var(--text-primary)]">{p.items[1].terminalOutput?.cmd}</span>
              </div>
              {p.items[1].terminalOutput?.stdout.map((line, i) => (
                <div key={i} className="text-[var(--text-primary)] pl-2">
                  ✓ {line}
                </div>
              ))}
            </div>

            <div>
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-header font-bold text-lg text-[var(--text-primary)] leading-snug"
              >
                {p.items[1].title}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed"
              >
                {p.items[1].description}
              </motion.p>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
            <span className="font-mono text-[11px] text-[var(--text-secondary)]">C++20</span>
            <a
              href={PROJECTS_DATA[1].githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
            >
              <span>{p.exploreRepo}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.article>

        {/* Project 3: ESP32 Embedded Telemetry Hub (Slides in from Left) */}
        <motion.article 
          id="project-esp32-hub"
          initial={{ opacity: 0, x: isRtl ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="interactive-project-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-5"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {p.items[2].tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text-secondary)] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={PROJECTS_DATA[2].githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View ESP32 Hub on GitHub"
                className="w-9 h-9 rounded-full border border-[var(--border)] text-[var(--text-secondary)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                <Cpu className="w-4 h-4 text-[var(--accent)]" />
              </a>
            </div>

            <div className="p-3 rounded-2xl bg-[var(--accent-subtle)] border border-[var(--border)] flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase font-bold text-[var(--accent)]">Telemetry</span>
              <div className="text-xs font-semibold text-[var(--text-primary)]">
                {p.items[2].metrics}
              </div>
            </div>

            <div>
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-header font-bold text-lg text-[var(--text-primary)] leading-snug"
              >
                {p.items[2].title}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed"
              >
                {p.items[2].description}
              </motion.p>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
            <span className="font-mono text-[11px] text-[var(--text-secondary)]">Microcontrollers</span>
            <a
              href={PROJECTS_DATA[2].githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
            >
              <span>{p.viewSource}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.article>

        {/* Project 4: 2-Column Span Card (Fluid UI Engine) (Slides in from Right) */}
        <motion.article 
          id="project-ui-engine"
          initial={{ opacity: 0, x: isRtl ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2 lg:col-span-2 interactive-project-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-6"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {p.items[3].tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] font-medium text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="px-3 py-1 rounded-full bg-[var(--accent-subtle)] border border-[var(--border)] text-[var(--accent)] font-mono text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                <span>{p.items[3].badgeText}</span>
              </div>
            </div>

            <div>
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-header font-bold text-xl sm:text-2xl text-[var(--text-primary)] leading-snug"
              >
                {p.items[3].title}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed max-w-2xl"
              >
                {p.items[3].description}
              </motion.p>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
              <Layers className="w-4 h-4 text-[var(--accent)]" />
              <span>Fluid Typography & Spatial Scales</span>
            </div>

            <a
              href={PROJECTS_DATA[3].githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] text-xs font-semibold text-[var(--text-primary)] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>{p.designRepo}</span>
            </a>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

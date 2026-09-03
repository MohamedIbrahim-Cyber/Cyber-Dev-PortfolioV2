import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, ArrowUpRight, Plus, Sparkles } from 'lucide-react';
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
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[var(--border)]">
        <div>
          <motion.h2 
            id="projects-heading" 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
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

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project 1 */}
        <motion.article 
          id="project-course-organizer"
          initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2 lg:col-span-2 relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[420px] flex flex-col justify-between p-6 sm:p-8 border border-[var(--border)] shadow-md group interactive-project-card spotlight-card"
        >
          {/* Background image layer */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-black/40">
            <img
              src="/course-organizer.svg"
              alt="Course Organizer Preview"
              onError={(e) => {
                // Fallback image
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80';
              }}
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            {/* Scrim overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/35 backdrop-blur-[0.5px]" />
          </div>

          {/* Top row */}
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {p.items[0].tags.map((tag) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="px-3 py-1 rounded-full bg-black/70 border border-white/20 text-white font-medium text-[11px] backdrop-blur-md"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <a
              href="https://courses.cyberdev.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Course Organizer Live Demo"
              className="w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-[var(--accent)] hover:border-transparent transition-all shadow-md group-hover:rotate-45 group-hover:bg-[var(--accent)] group-hover:border-transparent"
            >
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>

          {/* Bottom content */}
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
              className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-xl"
            >
              {p.items[0].description}
            </motion.p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="https://courses.cyberdev.me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-white font-semibold text-xs hover:bg-[var(--accent-hover)] transition-all shadow-md hover:scale-105"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{p.liveDemo}</span>
              </a>

              <a
                href="https://github.com/MohamedIbrahim-Cyber/Course-Organizer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all backdrop-blur-sm hover:scale-105"
              >
                <Github className="w-3.5 h-3.5" />
                <span>{p.githubRepo}</span>
              </a>
            </div>
          </div>
        </motion.article>

        {/* Project 2 - Aqdak */}
        <motion.article 
          id="project-aqdak"
          initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="spotlight-card interactive-project-card group rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-md min-h-[380px] sm:min-h-[420px]"
        >
          {/* Project 2 background image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/aqdak-contract.svg"
              alt="Aqdak Contract Agreement Document Preview"
              className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
            />
            {/* Scrim overlay for crisp typography contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/45 backdrop-blur-[0.5px]" />
          </div>

          {/* Top row */}
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {(p.items[1]?.tags || ['React', 'Bilingual Contracts', 'PDF Engine', 'InstaPay']).map((tag) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="px-3 py-1 rounded-full bg-black/70 border border-white/20 text-white font-medium text-[11px] backdrop-blur-md"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <a
              href="https://aqdak.cyberdev.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Aqdak Live Demo"
              className="w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-[var(--accent)] hover:border-transparent transition-all shadow-sm group-hover:rotate-45 group-hover:bg-[var(--accent)] flex-shrink-0"
            >
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>

          {/* Bottom content */}
          <div className="relative z-10 flex flex-col gap-3 mt-8">
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-header font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug group-hover:text-[var(--accent)] transition-colors"
            >
              {p.items[1]?.title || 'Aqdak'}
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs sm:text-sm text-white/85 leading-relaxed"
            >
              {p.items[1]?.description}
            </motion.p>

            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/15">
              <a
                href="https://aqdak.cyberdev.me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--accent)] text-white font-semibold text-xs hover:bg-[var(--accent-hover)] transition-all shadow-md hover:scale-105"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{p.liveDemo}</span>
              </a>

              <a
                href="https://github.com/MohamedIbrahim-Cyber/Aqdak"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all backdrop-blur-sm hover:scale-105"
              >
                <Github className="w-3.5 h-3.5" />
                <span>{p.githubRepo}</span>
              </a>
            </div>
          </div>
        </motion.article>

        {/* Project 3 */}
        <motion.article 
          id="project-placeholder-2"
          initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="project-placeholder-card spotlight-card group rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-5 cursor-default"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center group-hover:rotate-90 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(184,29,52,0.45)] transition-all duration-300">
                <Plus className="w-5 h-5" />
              </div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text-secondary)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors"
              >
                {isRtl ? 'قريباً' : 'Coming Soon'}
              </motion.span>
            </div>

            <div>
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-header font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors"
              >
                {isRtl ? 'مشروع جديد قادم' : 'Upcoming Project'}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed"
              >
                {isRtl 
                  ? 'مساحة مخصصة لإضافة مشاريع برمجية جديدة قيد التطوير والاختبار.'
                  : 'Reserved slot for newly architected software projects currently in active engineering.'}
              </motion.p>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border)] flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)] group-hover:scale-110 transition-transform" />
            <span>{isRtl ? 'قيد التطوير والتجهيز' : 'In Active Development'}</span>
          </div>
        </motion.article>

        {/* Project 4 */}
        <motion.article 
          id="project-placeholder-3"
          initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2 lg:col-span-2 project-placeholder-card spotlight-card group rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-6 cursor-default"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center group-hover:rotate-90 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(184,29,52,0.45)] transition-all duration-300">
                <Plus className="w-5 h-5" />
              </div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-mono text-[11px] px-3 py-1 rounded-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text-secondary)] font-semibold group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors"
              >
                {isRtl ? 'مساحة لمشروع قادم' : 'Featured Slot Open'}
              </motion.span>
            </div>

            <div>
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-header font-bold text-xl sm:text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors"
              >
                {isRtl ? 'مشروع رئيسي قادم' : 'Upcoming Major Project'}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed max-w-2xl"
              >
                {isRtl
                  ? 'مساحة مهيأة لعرض مشروع هندسي شامل بمجرد اكتماله ونشره على GitHub والإنترنت.'
                  : 'Ready to showcase full-scale engineering, open-source utilities, and interactive web architecture upon public deployment.'}
              </motion.p>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border)] flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
            <Sparkles className="w-4 h-4 text-[var(--accent)] group-hover:scale-110 transition-transform" />
            <span>{isRtl ? 'سيتم إدراجه قريباً' : 'Scheduled for Upcoming Release'}</span>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

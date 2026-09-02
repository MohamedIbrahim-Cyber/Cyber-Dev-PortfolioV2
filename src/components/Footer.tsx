import React from 'react';
import { ArrowUp, Terminal, Github, Linkedin, Mail } from 'lucide-react';
import { translations, Language } from '../data/translations';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const f = t.footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[var(--border)] pt-10 pb-16 mt-16 text-xs text-[var(--text-secondary)]">
      <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-mono font-bold text-[10px]">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col text-start">
            <span className="font-header font-bold text-sm text-[var(--text-primary)]">
              {f.role}
            </span>
            <span className="text-[11px] text-[var(--text-secondary)]">
              {f.university}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <a
            href="https://github.com/MohamedIbrahim-Cyber"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-[var(--accent)] transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-[var(--accent)] transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:contact@cyberdev.com"
            aria-label="Email"
            className="hover:text-[var(--accent)] transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] text-[var(--text-secondary)]">
            © {new Date().getFullYear()} {f.rights}
          </span>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center justify-center transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

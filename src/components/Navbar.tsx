import React, { useState, useEffect } from 'react';
import { Sun, Moon, Download, Menu, X, Terminal, Code2, Globe } from 'lucide-react';
import { translations, Language } from '../data/translations';

interface NavbarProps {
  currentTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  currentLang: Language;
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentTheme, 
  onToggleTheme, 
  currentLang, 
  onToggleLang 
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('About');

  const t = translations[currentLang];

  const navLinks = [
    { name: t.nav.about, id: 'About', href: '#About' },
    { name: t.nav.projects, id: 'Projects', href: '#Projects' },
    { name: t.nav.skills, id: 'Skills', href: '#Skills' },
    { name: t.nav.services, id: 'Services', href: '#Services' },
    { name: t.nav.contact, id: 'Contact', href: '#Contact' },
  ];

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav 
        id="main-navigation"
        aria-label="Main Navigation"
        className="pointer-events-auto w-full max-w-3xl glass-nav rounded-full px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between shadow-lg transition-all duration-300"
      >
        {/* Brand Logo */}
        <a 
          href="#" 
          id="nav-brand"
          aria-label="CyberDev Portfolio Home"
          className="flex items-center gap-2.5 font-header font-bold text-base sm:text-lg tracking-tight text-[var(--text-primary)] hover:opacity-85 transition-opacity px-2"
        >
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-mono font-bold text-xs shadow-sm">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="hidden sm:inline">CyberDev</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection.toLowerCase() === link.id.toLowerCase();
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--accent)] text-white font-semibold shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg)]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Language Toggle Button */}
          <button
            id="language-toggle-btn"
            type="button"
            onClick={onToggleLang}
            aria-label={`Switch language to ${currentLang === 'en' ? 'Arabic' : 'English'}`}
            className="px-2.5 h-9 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] flex items-center justify-center gap-1.5 hover:border-[var(--accent)] hover:text-[var(--accent)] text-xs font-semibold font-mono transition-all duration-200 focus:outline-none"
          >
            <Globe className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-[11px] font-bold">
              {currentLang === 'en' ? 'AR' : 'EN'}
            </span>
          </button>

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
            className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200 focus:outline-none"
          >
            {currentTheme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Download CV (Desktop) with blank src */}
          <a
            href=""
            download
            id="download-cv-btn"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all duration-200 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.nav.downloadCv}</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.mobileMenu}
            className="md:hidden w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] flex items-center justify-center hover:border-[var(--accent)] focus:outline-none"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div 
          id="mobile-nav-backdrop"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden pointer-events-auto transition-opacity"
        >
          <div
            id="mobile-nav-drawer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-20 left-4 right-4 max-w-md mx-auto glass-nav rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-[var(--nav-border)] animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <span className="font-header font-bold text-sm tracking-wide text-[var(--text-secondary)] uppercase">
                {t.nav.mobileMenu}
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1"
                aria-label={t.nav.closeMenu}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-4 rounded-xl font-header font-semibold text-lg text-[var(--text-primary)] hover:bg-[var(--bg)] hover:text-[var(--accent)] transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <Code2 className="w-4 h-4 text-[var(--text-secondary)]" />
                </a>
              ))}
            </div>

            {/* Mobile Language and CV Actions */}
            <div className="pt-3 border-t border-[var(--border)] flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  onToggleLang();
                  setMobileOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent)]"
              >
                <Globe className="w-4 h-4 text-[var(--accent)]" />
                <span>{currentLang === 'en' ? 'التحويل إلى العربية' : 'Switch to English'}</span>
              </button>

              <a
                href=""
                download
                id="mobile-download-cv-btn"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-all shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>{t.nav.downloadCv}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

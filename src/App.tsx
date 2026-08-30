import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsBento } from './components/ProjectsBento';
import { SkillsSection } from './components/SkillsSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Language } from './data/translations';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  });

  const [currentLang, setCurrentLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('lang');
      if (savedLang === 'en' || savedLang === 'ar') return savedLang;
    }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('lang', currentLang);
  }, [currentLang]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLang = () => {
    setCurrentLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-300 flex flex-col items-center selection:bg-[var(--accent)] selection:text-white">
      {/* Floating Pill Navbar */}
      <Navbar 
        currentTheme={theme} 
        onToggleTheme={toggleTheme} 
        currentLang={currentLang}
        onToggleLang={toggleLang}
      />

      {/* Main Content Sections */}
      <main className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-20">
        <Hero currentLang={currentLang} />
        <AboutSection currentLang={currentLang} />
        <ProjectsBento currentLang={currentLang} />
        <SkillsSection currentLang={currentLang} />
        <ServicesSection currentLang={currentLang} />
        <ContactSection currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />
    </div>
  );
}


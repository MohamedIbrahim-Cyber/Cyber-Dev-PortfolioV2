import React from 'react';
import { translations, Language } from '../data/translations';

interface TerminalCardProps {
  currentLang?: Language;
}

export const TerminalCard: React.FC<TerminalCardProps> = ({ currentLang = 'en' }) => {
  const t = translations[currentLang].terminal;

  return (
    <div 
      id="hero-terminal-card"
      dir="ltr"
      className="w-full max-w-lg rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xl p-5 font-mono text-xs sm:text-sm text-[var(--text-primary)] animate-floating select-none"
    >
      {/* Terminal Window Header */}
      <div className="flex items-center pb-3 mb-3 border-b border-[var(--border)] text-[var(--text-secondary)]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#eab308] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] inline-block" />
        </div>
        <span className="ml-3 text-xs font-semibold text-[var(--text-secondary)]">
          {t.fileName}
        </span>
      </div>

      {/* Terminal Display Body */}
      <div className="flex flex-col gap-3 leading-relaxed text-left">
        {/* Line 1 */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent)] font-bold">$</span>
            <span className="text-[var(--text-secondary)]">{t.whoAmI}</span>
          </div>
          <div className="pl-4 text-[var(--text-primary)]">
            {t.whoAmIVal}
          </div>
        </div>

        {/* Line 2 */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent)] font-bold">$</span>
            <span className="text-[var(--text-secondary)]">{t.upTime}</span>
          </div>
          <div className="pl-4 text-[var(--text-primary)]">
            {t.upTimeVal}
          </div>
        </div>

        {/* Line 3 - JSON Block */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent)] font-bold">$</span>
            <span className="text-[var(--text-secondary)]">{t.focusCmd}</span>
          </div>
          <div className="pl-4 text-[var(--text-primary)]">
            <span>&#123;</span>
            <div className="pl-4 text-[var(--text-secondary)]">
              &quot;{t.coreKey}&quot;: [{t.coreVals.map(v => `"${v}"`).join(', ')}],
            </div>
            <div className="pl-4 text-[var(--text-secondary)]">
              &quot;{t.toolsKey}&quot;: [{t.toolsVals.map(v => `"${v}"`).join(', ')}]
            </div>
            <span>&#125;</span>
          </div>
        </div>

        {/* Blinking Prompt Line */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[var(--accent)] font-bold">$</span>
          <span className="cursor-blink" />
        </div>
      </div>
    </div>
  );
};

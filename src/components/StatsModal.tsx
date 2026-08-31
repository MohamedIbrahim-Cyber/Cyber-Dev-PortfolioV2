import React, { useEffect, useState } from 'react';
import { 
  X, 
  Cpu, 
  Gamepad2, 
  Music, 
  Trophy, 
  Zap, 
  ExternalLink,
  Monitor,
  Headphones,
  Mic,
  Mouse,
  Keyboard as KeyboardIcon,
  Flame,
  Disc3,
  Sparkles
} from 'lucide-react';
import { Language } from '../data/translations';

export interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: Language;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  currentLang = 'en',
}) => {
  const [activeTab, setActiveTab] = useState<'rig' | 'gaming' | 'music'>('rig');
  const isRtl = currentLang === 'ar';

  // Prevent background scrolling and attach Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const artists = [
    {
      name: 'Lo-Fi Girl',
      role: 'Beats & Ambient Study Chill',
      url: 'https://open.spotify.com/user/chilledcow?si=7c5cdad8d8044152',
      tag: 'Lofi / Focus'
    },
    {
      name: 'Jungli!',
      role: 'Fast-Paced Electronic & Rhythm',
      url: 'https://open.spotify.com/artist/4b3l9xoHJhsHFlz7RIG1Od?si=dXPXOajUTJCIdiNNBssbVA',
      tag: 'Speedcore / EDM'
    },
    {
      name: 'Kasane Teto',
      role: 'UTAU / Synthesizer V Vocalist',
      url: 'https://open.spotify.com/artist/4JX0GdKx8EduY2Ck7qac4H?si=WbteqKv0S9qihwFZvkdAmA',
      tag: 'Vocaloid / SynthV'
    },
    {
      name: 'Tame Impala',
      role: 'Psychedelic Pop / Synth Resonance',
      url: 'https://open.spotify.com/artist/5INjqkS1o8h1imAzPqGZBb?si=3PMDYhFURsKve-Xy9MOUtg',
      tag: 'Psychedelic'
    },
    {
      name: 'TheManBeHisLa',
      role: 'Energetic Indie & Synth Groove',
      url: 'https://open.spotify.com/artist/224sN7roxbAD3v74d2icqc?si=jzGbwnFbSbSPW8-QtdWytA',
      tag: 'Synth Indie'
    },
  ];

  const playlists = [
    {
      title: 'Kasane Teto songs',
      desc: 'Curated energetic SynthV and UTAU collection',
      url: 'https://open.spotify.com/playlist/1QgCRglAwiqDt3FEDKyNBM?si=5a33ed6824534558',
    },
    {
      title: 'My Fav Teto Songs',
      desc: 'Top vocal tracks & heavy rhythm beats',
      url: 'https://open.spotify.com/playlist/68HW0SbvE8467nLXwTlyMX?si=87a009c763174333&pt=0938c85e55830abf278ca4b9a4711603',
    },
    {
      title: 'Summer Lo-Fi',
      desc: 'Warm sunset chords and deep focus session beats',
      url: 'https://open.spotify.com/playlist/4uetfQruTQe11peVv57vnN?si=ff2e07e7e4384e87',
    },
    {
      title: 'Cover Lo-Fi',
      desc: 'Chill anime & game acoustic reworkings',
      url: 'https://open.spotify.com/playlist/2PTzPzYOIqHh9UNceYrnQO?si=bf0c52299f9a477d',
    },
  ];

  return (
    <div 
      id="secret-stats-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="easter-egg-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop with dark blur */}
      <div 
        id="easter-egg-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      />

      {/* Cyberpunk & Terminal Styled Modal Container matching exact site theme tokens */}
      <div 
        id="easter-egg-container"
        className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(184,29,52,0.25)] text-[var(--text-primary)] overflow-hidden my-auto animate-fadeIn"
      >
        {/* Terminal Header Bar with standard window control dots */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-sm select-none">
          <div className="flex items-center gap-3">
            {/* Window control dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#eab308] inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#22c55e] inline-block shadow-sm" />
            </div>

            {/* Terminal File / Status Tag */}
            <div className="flex items-center gap-2 pl-2 border-l border-[var(--border)]">
              <span className="font-mono font-bold text-[11px] sm:text-xs text-[var(--accent)] tracking-wider">
                SYS_OVERRIDE // LEVEL_UP.EXE
              </span>
              <span className="hidden sm:inline-block font-mono text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/30">
                STATUS: OVERLOAD 100%
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            id="stats-modal-close-btn"
            type="button"
            onClick={onClose}
            aria-label="Close Level-Up Modal"
            className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--accent)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Banner */}
        <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-[var(--accent-subtle)] via-transparent to-[var(--surface)] border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[var(--accent-subtle)] border border-[var(--accent)] text-[var(--accent)] flex items-center justify-center shadow-[0_0_15px_rgba(184,29,52,0.3)]">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 id="easter-egg-title" className="font-header font-bold text-lg sm:text-xl text-[var(--text-primary)] tracking-tight">
                {isRtl ? 'ملف المواصفات والإحصائيات السرية' : 'DEV LOADOUT & GAMER PROFILE'}
              </h2>
              <p className="font-mono text-xs text-[var(--text-secondary)]">
                {isRtl ? 'المواصفات التقنية، العتاد، السجلات، والموسيقى المفضلة' : 'Hardware battle-station, competitive stats, & audio rotations'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
              RANK: <strong className="text-[var(--accent)]">TIER-S</strong>
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-5 sm:px-6 py-2.5 border-b border-[var(--border)] bg-[var(--bg)]/70 overflow-x-auto select-none">
          <button
            type="button"
            onClick={() => setActiveTab('rig')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold font-mono whitespace-nowrap transition-all ${
              activeTab === 'rig'
                ? 'bg-[var(--accent)] text-white shadow-[0_0_15px_rgba(184,29,52,0.4)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{isRtl ? 'العتاد والمواصفات' : 'Rig & Peripherals'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gaming')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold font-mono whitespace-nowrap transition-all ${
              activeTab === 'gaming'
                ? 'bg-[var(--accent)] text-white shadow-[0_0_15px_rgba(184,29,52,0.4)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{isRtl ? 'سجلات الألعاب' : 'Gaming Records'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('music')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold font-mono whitespace-nowrap transition-all ${
              activeTab === 'music'
                ? 'bg-[var(--accent)] text-white shadow-[0_0_15px_rgba(184,29,52,0.4)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]'
            }`}
          >
            <Disc3 className="w-3.5 h-3.5" />
            <span>{isRtl ? 'الموسيقى وقوائم التشغيل' : 'Soundtrack & Playlists'}</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* TAB 1: Rig & Peripherals */}
          {activeTab === 'rig' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Section 1: Rig Specs */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-[var(--accent)]" />
                    <h3 className="font-header font-bold text-sm sm:text-base text-[var(--text-primary)]">
                      {isRtl ? 'مواصفات الجهاز (Rig Specs)' : 'PRIMARY BATTLESTATION SPECS'}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--text-secondary)]">
                    Lenovo LOQ Series
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Model */}
                  <div className="p-3.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors group">
                    <span className="text-[10px] font-mono text-[var(--accent)] block font-semibold mb-1">SYSTEM MODEL</span>
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">Lenovo LOQ 15IAX9</h4>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-mono">Gaming & High-Efficiency Dev Laptop</p>
                  </div>

                  {/* CPU */}
                  <div className="p-3.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors group">
                    <span className="text-[10px] font-mono text-[var(--accent)] block font-semibold mb-1">PROCESSOR</span>
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">Intel Core i5</h4>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-mono">Multi-core Performance Architecture</p>
                  </div>

                  {/* GPU */}
                  <div className="p-3.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors group">
                    <span className="text-[10px] font-mono text-[var(--accent)] block font-semibold mb-1">DEDICATED GPU</span>
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">NVIDIA GeForce RTX 3050</h4>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-mono">6GB GDDR6 / Ray Tracing & DLSS</p>
                  </div>

                  {/* RAM */}
                  <div className="p-3.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors group">
                    <span className="text-[10px] font-mono text-[var(--accent)] block font-semibold mb-1">MEMORY (RAM)</span>
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">12GB DDR5</h4>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-mono">High-Speed DDR5 Bus</p>
                  </div>

                  {/* Storage */}
                  <div className="p-3.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors group sm:col-span-2 lg:col-span-2">
                    <span className="text-[10px] font-mono text-[var(--accent)] block font-semibold mb-1">STORAGE IO</span>
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">512GB M.2 NVMe SSD</h4>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-mono">Ultra-fast PCIe Gen4 NVMe for instant OS & container cold boots</p>
                  </div>
                </div>
              </div>

              {/* Section 2: Peripherals (Gear) */}
              <div className="pt-2 border-t border-[var(--border)]">
                <div className="flex items-center gap-2 mb-3">
                  <Gamepad2 className="w-4 h-4 text-[var(--accent)]" />
                  <h3 className="font-header font-bold text-sm sm:text-base text-[var(--text-primary)]">
                    {isRtl ? 'العتاد والملحقات (Peripherals Gear)' : 'PERIPHERALS & WORKBENCH GEAR'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Mouse */}
                  <div className="p-3.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-[var(--accent)] font-semibold">PRECISION MOUSE</span>
                      <Mouse className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                    </div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">Attack Shark X11</h4>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-mono">Ultra-lightweight sensor with magnetic charging dock</p>
                  </div>

                  {/* Keyboard */}
                  <div className="p-3.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-[var(--accent)] font-semibold">KEYBOARD</span>
                      <KeyboardIcon className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                    </div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">Attack Shark K86</h4>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-mono">Gasket hot-swappable tactile RGB mechanical board</p>
                  </div>

                  {/* Headset */}
                  <div className="p-3.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-[var(--accent)] font-semibold">AUDIO HEADSET</span>
                      <Headphones className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                    </div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">Attack Shark L80</h4>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-mono">Low-latency 2.4G wireless spatial gaming headset</p>
                  </div>

                  {/* Microphone */}
                  <div className="p-3.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-[var(--accent)] font-semibold">STUDIO MIC</span>
                      <Mic className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                    </div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">Maono AU-A04</h4>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-mono">192kHz/24Bit professional cardioid condenser mic</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Gaming Records */}
          {activeTab === 'gaming' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[var(--accent)]" />
                    <h3 className="font-header font-bold text-sm sm:text-base text-[var(--text-primary)]">
                      {isRtl ? 'إحصائيات وسجلات الألعاب التنافسية' : 'COMPETITIVE GAMING RECORDS'}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/30 font-semibold">
                    TOP TIER
                  </span>
                </div>

                {/* Highlighted Tiers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Apex Legends */}
                  <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-[var(--accent)] font-bold">FPS // BATTLE ROYALE</span>
                      <span className="px-2 py-0.5 rounded bg-[var(--accent-subtle)] text-[var(--accent)] text-[10px] font-mono font-bold">
                        PEAK RANK
                      </span>
                    </div>
                    <h4 className="font-header font-bold text-lg text-[var(--text-primary)]">Apex Legends</h4>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-base sm:text-lg font-bold text-[#38bdf8] font-mono">Platinum 1</span>
                      <span className="text-xs text-[var(--text-secondary)] font-mono">(7 Seasons Peak)</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-1.5">
                      Aggressive entry fragger & tactical map rotation specialist across multiple ranked seasons.
                    </p>
                  </div>

                  {/* osu! */}
                  <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-[var(--accent)] font-bold">RHYTHM // REACTION SPEED</span>
                      <span className="px-2 py-0.5 rounded bg-[#ec4899]/20 text-[#ec4899] text-[10px] font-mono font-bold border border-[#ec4899]/30">
                        NATIONAL LEADERBOARD
                      </span>
                    </div>
                    <h4 className="font-header font-bold text-lg text-[var(--text-primary)]">osu! Standard</h4>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-base sm:text-lg font-bold text-[#ec4899] font-mono">#700 Ranking</span>
                      <span className="text-xs text-[var(--text-secondary)] font-mono">in Egypt</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-1.5">
                      High single-tap stamina, precision cursor tracking, and sub-170ms hand-eye coordination.
                    </p>
                  </div>
                </div>

                {/* Active Game Rotation */}
                <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--border)]">
                  <div className="flex items-center gap-2 mb-3">
                    <Flame className="w-4 h-4 text-[var(--accent)]" />
                    <span className="font-mono text-xs font-bold text-[var(--text-primary)] tracking-wide">
                      CURRENT ACTIVE ROTATION
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'Cyberpunk 2077', genre: 'Sci-Fi RPG / Modding' },
                      { name: 'Elden Ring', genre: 'Soulsborne Mastery' },
                      { name: 'Nine Sols', genre: 'Taopunk Action Platformer' },
                      { name: 'The Finals', genre: 'Dynamic Tactical Destruction' },
                      { name: 'Lethal Company', genre: 'Co-op Extraction Horror' },
                    ].map((game, idx) => (
                      <div 
                        key={idx}
                        className="px-3.5 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors flex flex-col"
                      >
                        <span className="font-bold text-xs text-[var(--text-primary)]">{game.name}</span>
                        <span className="font-mono text-[10px] text-[var(--text-secondary)]">{game.genre}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Soundtrack & Playlists */}
          {activeTab === 'music' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Artists Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Disc3 className="w-4 h-4 text-[var(--accent)]" />
                  <h3 className="font-header font-bold text-sm sm:text-base text-[var(--text-primary)]">
                    {isRtl ? 'الفنانين والموسيقيين المفضلين' : 'FAVORITE ARTISTS & MUSIC CREATORS'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {artists.map((artist, idx) => (
                    <a
                      key={idx}
                      href={artist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-md transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[10px] text-[var(--accent)] font-semibold">{artist.tag}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                        <h4 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                          {artist.name}
                        </h4>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-mono">
                          {artist.role}
                        </p>
                      </div>
                      <span className="mt-2 text-[10px] font-mono text-[var(--text-secondary)] flex items-center gap-1 group-hover:underline">
                        Open on Spotify ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Playlists Section */}
              <div className="pt-2 border-t border-[var(--border)]">
                <div className="flex items-center gap-2 mb-3">
                  <Music className="w-4 h-4 text-[var(--accent)]" />
                  <h3 className="font-header font-bold text-sm sm:text-base text-[var(--text-primary)]">
                    {isRtl ? 'قوائم التشغيل اليومية' : 'FAVORITE CODING & GAMING PLAYLISTS'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {playlists.map((pl, idx) => (
                    <a
                      key={idx}
                      href={pl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-md transition-all group flex items-start justify-between gap-3"
                    >
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                          {pl.title}
                        </h4>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-mono">
                          {pl.desc}
                        </p>
                        <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono text-[var(--text-secondary)] group-hover:underline">
                          Listen on Spotify ↗
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-[var(--surface)] border border-[var(--border)] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent-subtle)] text-[var(--text-secondary)] group-hover:text-[var(--accent)] flex items-center justify-center shrink-0 transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-3 border-t border-[var(--border)] bg-[var(--bg)]/90 flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>CyberDev Stats Hub // Press [ESC] to Exit</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--accent)] hover:text-[var(--accent-hover)] font-semibold transition-colors"
          >
            DISMISS [✕]
          </button>
        </div>
      </div>
    </div>
  );
};

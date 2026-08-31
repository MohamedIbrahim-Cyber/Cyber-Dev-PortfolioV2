import React, { useEffect, useState } from 'react';
import { 
  X, 
  Cpu, 
  Gamepad2, 
  Music, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Trophy, 
  Zap, 
  ShieldCheck, 
  Terminal, 
  Sparkles,
  Layers,
  Flame,
  Radio
} from 'lucide-react';
import { chiptuneAudio } from '../utils/audioSynth';
import { Language } from '../data/translations';

interface SecretLevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: Language;
}

export const SecretLevelUpModal: React.FC<SecretLevelUpModalProps> = ({
  isOpen,
  onClose,
  currentLang = 'en',
}) => {
  const [isPlayingBgm, setIsPlayingBgm] = useState(false);
  const [activeTab, setActiveTab] = useState<'hardware' | 'ranks' | 'audio'>('hardware');
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
      chiptuneAudio.stopBgm();
      setIsPlayingBgm(false);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleMusic = () => {
    chiptuneAudio.toggleBgm((playing) => {
      setIsPlayingBgm(playing);
    });
  };

  return (
    <div 
      id="secret-level-up-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="easter-egg-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div 
        id="easter-egg-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      />

      {/* Cyberpunk Modal Container */}
      <div 
        id="easter-egg-container"
        className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0e1114] border-2 border-[#06b6d4] shadow-[0_0_50px_rgba(6,182,212,0.35)] text-white overflow-hidden my-auto"
      >
        {/* Top Scanline / Glow Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#b81d34] via-[#06b6d4] to-[#10b981] animate-pulse" />

        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-[#06b6d4]/30 bg-[#14181d]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#06b6d4]/20 border border-[#06b6d4] text-[#06b6d4] flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <Zap className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs uppercase px-2 py-0.5 rounded bg-[#06b6d4]/20 text-[#22d3ee] border border-[#06b6d4]/40">
                  OVERCHARGE 100%
                </span>
                <span className="font-mono text-xs text-[#06b6d4] hidden sm:inline">
                  // EASTER_EGG_UNLOCKED
                </span>
              </div>
              <h2 id="easter-egg-title" className="font-header font-bold text-lg sm:text-2xl text-white tracking-tight">
                SECRET LEVEL-UP PROTOCOL
              </h2>
            </div>
          </div>

          {/* Close Button */}
          <button
            id="easter-egg-close-btn"
            type="button"
            onClick={onClose}
            aria-label="Close Level-Up Modal"
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-[#b81d34] hover:border-[#b81d34] text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-5 sm:px-7 py-3 border-b border-white/10 bg-[#0a0d10] overflow-x-auto select-none">
          <button
            type="button"
            onClick={() => setActiveTab('hardware')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold font-mono whitespace-nowrap transition-all ${
              activeTab === 'hardware'
                ? 'bg-[#06b6d4] text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Hardware Loadout</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ranks')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold font-mono whitespace-nowrap transition-all ${
              activeTab === 'ranks'
                ? 'bg-[#06b6d4] text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Game Ranks & Stats</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audio')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold font-mono whitespace-nowrap transition-all ${
              activeTab === 'audio'
                ? 'bg-[#06b6d4] text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>8-Bit Audio Deck</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* TAB 1: Hardware Loadout */}
          {activeTab === 'hardware' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-header font-bold text-lg text-white">
                    PRIMARY HARDWARE LOADOUT
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    High-performance workstation and embedded lab engineering rig
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                  RIG OVERCLOCKED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Spec 1: CPU */}
                <div className="p-4 rounded-2xl bg-[#14181d] border border-white/10 hover:border-[#06b6d4] transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#06b6d4]">CPU_CORE</span>
                    <Cpu className="w-4 h-4 text-zinc-400 group-hover:text-[#06b6d4] transition-colors" />
                  </div>
                  <h4 className="font-bold text-white text-sm sm:text-base">AMD Ryzen 9</h4>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">12-Core / 24-Threads @ 4.8GHz High-Throughput Dev Rig</p>
                </div>

                {/* Spec 2: GPU */}
                <div className="p-4 rounded-2xl bg-[#14181d] border border-white/10 hover:border-[#06b6d4] transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#06b6d4]">GRAPHICS_CORE</span>
                    <Flame className="w-4 h-4 text-zinc-400 group-hover:text-[#06b6d4] transition-colors" />
                  </div>
                  <h4 className="font-bold text-white text-sm sm:text-base">NVIDIA RTX Series</h4>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">12GB GDDR6X / CUDA Acceleration & AI Modeling</p>
                </div>

                {/* Spec 3: Memory */}
                <div className="p-4 rounded-2xl bg-[#14181d] border border-white/10 hover:border-[#06b6d4] transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#06b6d4]">RAM_CACHE</span>
                    <Layers className="w-4 h-4 text-zinc-400 group-hover:text-[#06b6d4] transition-colors" />
                  </div>
                  <h4 className="font-bold text-white text-sm sm:text-base">32GB Dual-Channel</h4>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">High-Frequency DDR5 @ 6000MHz Low Latency</p>
                </div>

                {/* Spec 4: Storage */}
                <div className="p-4 rounded-2xl bg-[#14181d] border border-white/10 hover:border-[#06b6d4] transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#06b6d4]">STORAGE_IO</span>
                    <Terminal className="w-4 h-4 text-zinc-400 group-hover:text-[#06b6d4] transition-colors" />
                  </div>
                  <h4 className="font-bold text-white text-sm sm:text-base">2TB NVMe PCIe Gen4</h4>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">7,450 MB/s Read Speed for Instant Container Boots</p>
                </div>

                {/* Spec 5: Peripherals */}
                <div className="p-4 rounded-2xl bg-[#14181d] border border-white/10 hover:border-[#06b6d4] transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#06b6d4]">INPUT_SYSTEM</span>
                    <Gamepad2 className="w-4 h-4 text-zinc-400 group-hover:text-[#06b6d4] transition-colors" />
                  </div>
                  <h4 className="font-bold text-white text-sm sm:text-base">Custom Mechanical</h4>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">Gateron Tactile Switches + Precision Dual Sensor Mouse</p>
                </div>

                {/* Spec 6: Embedded Lab */}
                <div className="p-4 rounded-2xl bg-[#14181d] border border-white/10 hover:border-[#06b6d4] transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#06b6d4]">EMBEDDED_LAB</span>
                    <Radio className="w-4 h-4 text-zinc-400 group-hover:text-[#06b6d4] transition-colors" />
                  </div>
                  <h4 className="font-bold text-white text-sm sm:text-base">ESP32 & ARM Cortex</h4>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">Logic Analyzers, Soldering Bench & IoT Microcontrollers</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Game Ranks & Achievements */}
          {activeTab === 'ranks' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-header font-bold text-lg text-white">
                    GAME RANKS & DEVELOPER ACHIEVEMENTS
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Competitive gaming tiers and engineer mastery unlocks
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#06b6d4]/20 text-[#22d3ee] border border-[#06b6d4]/40 font-mono text-xs font-bold">
                  RANK: S-TIER
                </span>
              </div>

              {/* Competitive Ranks Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1b1e23] to-[#121518] border border-[#f59e0b]/40 flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/15 text-[#f59e0b] flex items-center justify-center font-bold font-mono text-lg shrink-0 border border-[#f59e0b]/30">
                    🏆
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 block uppercase">CS2 Tactical FPS</span>
                    <span className="font-bold text-white text-sm sm:text-base">Faceit Level 8</span>
                    <span className="text-[11px] text-[#f59e0b] block font-mono">Top 2% Ranked Duelist</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1b1e23] to-[#121518] border border-[#06b6d4]/40 flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#06b6d4]/15 text-[#06b6d4] flex items-center justify-center font-bold font-mono text-lg shrink-0 border border-[#06b6d4]/30">
                    🎯
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 block uppercase">Precision Aim</span>
                    <span className="font-bold text-white text-sm sm:text-base">Immortal Peak</span>
                    <span className="text-[11px] text-[#22d3ee] block font-mono">Sub-180ms Reaction</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1b1e23] to-[#121518] border border-[#10b981]/40 flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#10b981]/15 text-[#10b981] flex items-center justify-center font-bold font-mono text-lg shrink-0 border border-[#10b981]/30">
                    ⚡
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 block uppercase">Algorithms</span>
                    <span className="font-bold text-white text-sm sm:text-base">Top 5% LeetCode</span>
                    <span className="text-[11px] text-[#10b981] block font-mono">1,000+ Solved</span>
                  </div>
                </div>
              </div>

              {/* Badges List */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-semibold text-[#06b6d4] uppercase tracking-wider">
                  UNLOCKED SPECIAL BADGES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-[#14181d] border border-white/10 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#b81d34]/20 text-[#b81d34] flex items-center justify-center font-bold text-sm">⚔️</span>
                    <div>
                      <span className="font-bold text-white block">HARDWARE ARCHITECT</span>
                      <span className="text-zinc-400 text-[11px]">Prototyped 10+ custom IoT hardware devices</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#14181d] border border-white/10 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#06b6d4]/20 text-[#06b6d4] flex items-center justify-center font-bold text-sm">🛡️</span>
                    <div>
                      <span className="font-bold text-white block">ZERO-DAY DEFENDER</span>
                      <span className="text-zinc-400 text-[11px]">Hardened full-stack endpoints with zero leaks</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#14181d] border border-white/10 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#10b981]/20 text-[#10b981] flex items-center justify-center font-bold text-sm">🚀</span>
                    <div>
                      <span className="font-bold text-white block">SPEEDRUN DEPLOYER</span>
                      <span className="text-zinc-400 text-[11px]">Zero-downtime CI/CD container orchestration</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#14181d] border border-white/10 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#f59e0b]/20 text-[#f59e0b] flex items-center justify-center font-bold text-sm">✨</span>
                    <div>
                      <span className="font-bold text-white block">PIXEL OVERLORD</span>
                      <span className="text-zinc-400 text-[11px]">Crafted ultra-smooth responsive 60FPS web UIs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 8-Bit Audio Deck */}
          {activeTab === 'audio' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-header font-bold text-lg text-white">
                    8-BIT RETRO CHIPTUNE SYNTHESIZER
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Procedurally synthesized chiptune engine running via Web Audio API
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleMusic}
                  className={`px-4 py-2 rounded-full font-mono text-xs font-bold flex items-center gap-2 transition-all ${
                    isPlayingBgm 
                      ? 'bg-[#10b981] text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]' 
                      : 'bg-[#06b6d4] text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                  }`}
                >
                  {isPlayingBgm ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isPlayingBgm ? 'PAUSE BGM' : 'PLAY 8-BIT THEME'}</span>
                </button>
              </div>

              {/* Visualizer & Track Status */}
              <div className="p-5 rounded-2xl bg-[#14181d] border border-[#06b6d4]/40 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] animate-ping" />
                    <span className="font-mono text-xs font-bold text-[#06b6d4]">
                      {isPlayingBgm ? 'NOW PLAYING: CYBER OVERDRIVE (8-BIT)' : 'TRACK READY: CYBER OVERDRIVE'}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-zinc-400">140 BPM // SQUARE & TRIANGLE WAVE</span>
                </div>

                {/* Animated 8-bit Equalizer Bars */}
                <div className="h-16 flex items-end justify-center gap-2 bg-[#090b0e] p-3 rounded-xl border border-white/5">
                  {[40, 75, 55, 90, 65, 80, 45, 95, 70, 60, 85, 50].map((height, idx) => (
                    <div
                      key={idx}
                      className="flex-1 rounded-t-sm transition-all duration-150"
                      style={{
                        height: isPlayingBgm ? `${Math.max(15, (height * (idx % 2 === 0 ? 0.9 : 1.1)) % 100)}%` : '10%',
                        backgroundColor: idx % 3 === 0 ? '#06b6d4' : idx % 3 === 1 ? '#b81d34' : '#10b981',
                        boxShadow: isPlayingBgm ? '0 0 8px currentColor' : 'none',
                        animation: isPlayingBgm ? `pulse ${0.3 + (idx * 0.05)}s ease-in-out infinite alternate` : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Sound FX Soundboard */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-semibold text-[#06b6d4] uppercase tracking-wider">
                  RETRO SFX SOUNDBOARD (CLICK TO TRIGGER)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => chiptuneAudio.playLaser()}
                    className="p-3.5 rounded-xl bg-[#14181d] border border-white/10 hover:border-[#06b6d4] hover:bg-[#06b6d4]/10 text-white font-mono text-xs font-semibold flex flex-col items-center gap-2 transition-all active:scale-95 shadow-sm"
                  >
                    <span className="text-xl">🔫</span>
                    <span>Laser Beam</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => chiptuneAudio.playPowerup()}
                    className="p-3.5 rounded-xl bg-[#14181d] border border-white/10 hover:border-[#10b981] hover:bg-[#10b981]/10 text-white font-mono text-xs font-semibold flex flex-col items-center gap-2 transition-all active:scale-95 shadow-sm"
                  >
                    <span className="text-xl">🍄</span>
                    <span>Power-Up</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => chiptuneAudio.playLevelUpFanfare()}
                    className="p-3.5 rounded-xl bg-[#14181d] border border-white/10 hover:border-[#f59e0b] hover:bg-[#f59e0b]/10 text-white font-mono text-xs font-semibold flex flex-col items-center gap-2 transition-all active:scale-95 shadow-sm"
                  >
                    <span className="text-xl">🎺</span>
                    <span>Level-Up</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => chiptuneAudio.playGlitch()}
                    className="p-3.5 rounded-xl bg-[#14181d] border border-white/10 hover:border-[#b81d34] hover:bg-[#b81d34]/10 text-white font-mono text-xs font-semibold flex flex-col items-center gap-2 transition-all active:scale-95 shadow-sm"
                  >
                    <span className="text-xl">👾</span>
                    <span>Glitch Warp</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 sm:px-7 py-3 border-t border-white/10 bg-[#0a0d10] flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#06b6d4]" />
            <span>CyberDev System v4.0 // Press ESC to exit</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#06b6d4] hover:underline font-semibold"
          >
            DISMISS [✕]
          </button>
        </div>
      </div>
    </div>
  );
};

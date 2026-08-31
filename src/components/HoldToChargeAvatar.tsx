import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Zap, Sparkles, Keyboard } from 'lucide-react';
import { chiptuneAudio } from '../utils/audioSynth';
import { SecretLevelUpModal } from './SecretLevelUpModal';
import { Language } from '../data/translations';

interface HoldToChargeAvatarProps {
  imageSrc?: string;
  altText?: string;
  className?: string;
  currentLang?: Language;
}

const HOLD_DURATION_MS = 1500; // Exactly 1.5 seconds

export const HoldToChargeAvatar: React.FC<HoldToChargeAvatarProps> = ({
  imageSrc = '/shadow-card.png',
  altText = 'Shadow Character Artwork',
  className = '',
  currentLang = 'en',
}) => {
  const [isCharging, setIsCharging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isRtl = currentLang === 'ar';

  const startTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isHoldingRef = useRef<boolean>(false);
  const activePointerIdRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isKeyHoldingRef = useRef<boolean>(false);

  // Clean reset function
  const resetCharge = useCallback(() => {
    isHoldingRef.current = false;
    isKeyHoldingRef.current = false;
    startTimeRef.current = null;
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    chiptuneAudio.stopChargeHum();
    setIsCharging(false);
    setProgress(0);
  }, []);

  // Animation frame loop for smooth 60fps gauge progress
  const updateProgress = useCallback(() => {
    if (!isHoldingRef.current || startTimeRef.current === null) return;

    const now = performance.now();
    const elapsed = now - startTimeRef.current;
    const currentProgress = Math.min(100, (elapsed / HOLD_DURATION_MS) * 100);

    setProgress(currentProgress);

    if (currentProgress >= 100) {
      // 100% Charged - Trigger Level-Up!
      resetCharge();

      // Trigger Haptic Feedback with safety check for desktop & mobile
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator && typeof navigator.vibrate === 'function') {
        try {
          navigator.vibrate([30, 50, 30]);
        } catch {}
      }

      // Play Level-Up Fanfare
      chiptuneAudio.playLevelUpFanfare();

      // Open Modal
      setIsModalOpen(true);
    } else {
      animFrameRef.current = requestAnimationFrame(updateProgress);
    }
  }, [resetCharge]);

  // Start hold mechanic
  const startCharge = useCallback(() => {
    if (isModalOpen || isHoldingRef.current) return;

    isHoldingRef.current = true;
    startTimeRef.current = performance.now();
    setIsCharging(true);
    setProgress(0);

    // Audio hum
    chiptuneAudio.startChargeHum();

    // Start frame loop
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
    }
    animFrameRef.current = requestAnimationFrame(updateProgress);
  }, [isModalOpen, updateProgress]);

  // Unified Pointer Down Handler
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Only trigger on primary button / primary touch pointer
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (isModalOpen) return;

    // Attach pointer capture so movement outside bounds doesn't drop the charge
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
      activePointerIdRef.current = e.pointerId;
    } catch {}

    startCharge();
  }, [isModalOpen, startCharge]);

  // Unified Pointer Up & Cancel Handlers
  const handlePointerEnd = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current !== null && containerRef.current) {
      try {
        containerRef.current.releasePointerCapture(activePointerIdRef.current);
      } catch {}
      activePointerIdRef.current = null;
    }
    resetCharge();
  }, [resetCharge]);

  // Keyboard Support (Space & Enter keys for PC / Desktop)
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' || e.code === 'Space' || e.key === 'Enter') {
      e.preventDefault();
      if (!isKeyHoldingRef.current && !isModalOpen) {
        isKeyHoldingRef.current = true;
        startCharge();
      }
    }
  }, [isModalOpen, startCharge]);

  const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' || e.code === 'Space' || e.key === 'Enter') {
      e.preventDefault();
      isKeyHoldingRef.current = false;
      resetCharge();
    }
  }, [resetCharge]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      resetCharge();
    };
  }, [resetCharge]);

  // SVG Circle Dimensions
  const size = 180;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      <div
        ref={containerRef}
        id="hold-to-charge-avatar-container"
        role="button"
        tabIndex={0}
        aria-label={
          isRtl
            ? 'أفاتار تفاعلي - اضغط باستمرار بالفأرة أو اللمس أو زر المسافة لشحن الهجوم'
            : 'Interactive avatar easter egg - hold pointer or spacebar for 1.5 seconds to charge secret attack'
        }
        aria-pressed={isCharging}
        className={`relative select-none touch-none cursor-pointer overflow-hidden group outline-none focus-visible:ring-2 focus-visible:ring-[#06b6d4] focus-visible:ring-offset-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:border-[#06b6d4]/80 ${className}`}
        style={{
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onPointerLeave={(e) => {
          setIsHovered(false);
          // Only release if not capturing pointer
          if (!activePointerIdRef.current) {
            handlePointerEnd(e);
          }
        }}
        onPointerEnter={() => setIsHovered(true)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        {/* Desktop Hover Tooltip (Hidden on mobile) */}
        <div
          className={`hidden sm:flex absolute top-4 inset-x-0 z-30 justify-center pointer-events-none transition-all duration-300 ${
            isHovered || isCharging
              ? 'opacity-100 transform translate-y-0'
              : 'opacity-0 transform -translate-y-2'
          }`}
        >
          <div className="px-3 py-1 rounded-full bg-[#0a0d10]/90 backdrop-blur-md border border-[#06b6d4]/60 text-[#22d3ee] font-mono text-[11px] flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Sparkles className="w-3 h-3 text-[#06b6d4]" />
            <span>
              {isCharging
                ? `${isRtl ? 'شحن الطاقة:' : 'CHARGING:'} ${Math.round(progress)}%`
                : isRtl
                ? 'اضغط مطولاً أو Space للشحن'
                : 'Hold or Press [Space] to Charge'}
            </span>
          </div>
        </div>

        {/* Avatar Image with dynamic scale & brightness during charge */}
        <img
          src={imageSrc}
          alt={altText}
          draggable={false}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop';
          }}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-200 pointer-events-none ${
            isCharging
              ? 'scale-95 brightness-110 filter drop-shadow-[0_0_20px_rgba(6,182,212,0.7)]'
              : 'group-hover:scale-105 group-hover:brightness-105'
          }`}
          style={{
            transform: isCharging
              ? `scale(0.95) translate(${(Math.random() - 0.5) * (progress > 50 ? 2.5 : 0)}px, ${(Math.random() - 0.5) * (progress > 50 ? 2.5 : 0)}px)`
              : undefined,
          }}
        />

        {/* Dynamic Glowing Cyan Charging Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${
            isCharging ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(circle at center, rgba(6, 182, 212, ${0.18 + (progress / 100) * 0.35}) 0%, rgba(184, 29, 52, 0.12) 70%, transparent 100%)`,
            boxShadow: isCharging ? 'inset 0 0 40px rgba(6, 182, 212, 0.65)' : 'none',
          }}
        />

        {/* Circular SVG Energy Charge Meter */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-200 ${
            isCharging ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <svg
              width={size}
              height={size}
              className="rotate-[-90deg] filter drop-shadow-[0_0_14px_#06b6d4]"
            >
              {/* Background Track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="rgba(6, 182, 212, 0.25)"
                strokeWidth={strokeWidth}
              />
              {/* Animated Glowing Progress Ring */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#06b6d4"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  transition: 'stroke-dashoffset 16ms linear',
                }}
              />
            </svg>

            {/* Center Percentage & Status Indicator */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-mono">
              <span className="text-[#22d3ee] font-extrabold text-2xl tracking-tighter drop-shadow-[0_0_8px_#06b6d4]">
                {Math.round(progress)}%
              </span>
              <span className="text-[10px] text-white/90 font-bold uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded-full border border-[#06b6d4]/50 mt-1">
                {progress >= 90 ? 'OVERLOAD!' : 'CHARGING'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Hint Pill */}
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center px-4 pointer-events-none">
          <div
            className={`px-3.5 py-1.5 rounded-full backdrop-blur-md border transition-all duration-300 flex items-center gap-1.5 text-xs font-mono select-none ${
              isCharging
                ? 'bg-[#06b6d4]/30 border-[#06b6d4] text-[#22d3ee] shadow-[0_0_15px_rgba(6,182,212,0.6)] scale-105'
                : 'bg-black/60 border-white/20 text-white/80 group-hover:border-[#06b6d4]/70 group-hover:text-white group-hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isCharging ? 'text-[#06b6d4] animate-bounce' : 'text-[#b81d34] group-hover:text-[#06b6d4]'}`} />
            <span className="font-semibold text-[11px] tracking-wide flex items-center gap-1">
              {isCharging
                ? isRtl ? 'جارِ الشحن...' : 'CHARGING ATTACK...'
                : (
                  <>
                    <span>{isRtl ? 'اضغط مطولاً للشحن' : 'HOLD TO CHARGE'}</span>
                    <span className="hidden sm:inline opacity-60 text-[10px]">[SPACE]</span>
                  </>
                )}
            </span>
          </div>
        </div>

        {/* Subtle Cyber Target Corners */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#06b6d4]/60 group-hover:border-[#06b6d4] transition-colors pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#06b6d4]/60 group-hover:border-[#06b6d4] transition-colors pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#06b6d4]/60 group-hover:border-[#06b6d4] transition-colors pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#06b6d4]/60 group-hover:border-[#06b6d4] transition-colors pointer-events-none" />
      </div>

      {/* Secret Level-Up Modal */}
      <SecretLevelUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentLang={currentLang}
      />
    </>
  );
};


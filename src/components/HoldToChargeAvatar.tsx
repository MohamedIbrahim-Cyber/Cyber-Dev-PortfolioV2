import React, { useState, useRef, useEffect, useCallback } from 'react';
import { chiptuneAudio } from '../utils/audioSynth';
import { StatsModal } from './StatsModal';
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
        className={`relative select-none touch-none cursor-pointer overflow-hidden group outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(184,29,52,0.35)] hover:border-[var(--accent)] ${className}`}
        style={{
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onPointerLeave={(e) => {
          // Only release if not capturing pointer
          if (!activePointerIdRef.current) {
            handlePointerEnd(e);
          }
        }}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
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
              ? 'scale-95 brightness-110 filter drop-shadow-[0_0_20px_rgba(184,29,52,0.6)]'
              : 'group-hover:scale-105 group-hover:brightness-105'
          }`}
          style={{
            transform: isCharging
              ? `scale(0.95) translate(${(Math.random() - 0.5) * (progress > 50 ? 2.5 : 0)}px, ${(Math.random() - 0.5) * (progress > 50 ? 2.5 : 0)}px)`
              : undefined,
          }}
        />

        {/* Dynamic Glowing Crimson Charging Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${
            isCharging ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(circle at center, rgba(184, 29, 52, ${0.25 + (progress / 100) * 0.45}) 0%, rgba(18, 24, 21, 0.4) 70%, transparent 100%)`,
            boxShadow: isCharging ? 'inset 0 0 40px rgba(184, 29, 52, 0.65)' : 'none',
          }}
        />

        {/* Circular SVG Energy Charge Meter (Active only while charging) */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-200 ${
            isCharging ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <svg
              width={size}
              height={size}
              className="rotate-[-90deg] filter drop-shadow-[0_0_14px_rgba(184,29,52,0.8)]"
            >
              {/* Background Track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="rgba(184, 29, 52, 0.25)"
                strokeWidth={strokeWidth}
              />
              {/* Animated Glowing Progress Ring */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="var(--accent, #b81d34)"
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
              <span className="text-[var(--accent)] font-extrabold text-2xl tracking-tighter drop-shadow-[0_0_10px_rgba(184,29,52,0.6)]">
                {Math.round(progress)}%
              </span>
              <span className="text-[10px] text-white/90 font-bold uppercase tracking-wider bg-black/70 px-2 py-0.5 rounded-full border border-[var(--accent)]/50 mt-1">
                {progress >= 90 ? 'OVERLOAD!' : 'CHARGING'}
              </span>
            </div>
          </div>
        </div>

        {/* Subtle Cyber Target Corners */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)]/40 group-hover:border-[var(--accent)] transition-colors pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)]/40 group-hover:border-[var(--accent)] transition-colors pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[var(--accent)]/40 group-hover:border-[var(--accent)] transition-colors pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[var(--accent)]/40 group-hover:border-[var(--accent)] transition-colors pointer-events-none" />
      </div>

      {/* Secret Stats Modal */}
      <StatsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentLang={currentLang}
      />
    </>
  );
};


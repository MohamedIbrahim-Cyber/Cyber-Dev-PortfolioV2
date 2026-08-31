import React, { useEffect, useState } from 'react';

export const CursorGlow: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse)
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
      });

      // Update card-level CSS variables on hovered spotlight cards
      const target = (e.target as HTMLElement)?.closest?.('.spotlight-card') as HTMLElement | null;
      if (target) {
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        target.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Outer ambient cursor glow */}
      <div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl pointer-events-none transition-transform ease-out duration-75"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(184, 29, 52, 0.06) 0%, rgba(184, 29, 52, 0.02) 45%, transparent 70%)',
        }}
      />
      {/* Inner bright core cursor glow */}
      <div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 blur-lg pointer-events-none transition-transform ease-out duration-75"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '160px',
          height: '160px',
          background: 'radial-gradient(circle, rgba(184, 29, 52, 0.11) 0%, rgba(184, 29, 52, 0.04) 50%, transparent 80%)',
        }}
      />
    </div>
  );
};

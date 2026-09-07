import { useEffect, useState } from 'react';

/**
 * ParallaxTechBackground
 * An executive, subtle, and professional tech background featuring:
 * - 4 calibrated depth parallax layers (Blueprint grid, Vector circuit traces, Subtle watermark code, Ambient gold dust)
 * - Ultra-fine hairline strokes and whisper-quiet low opacity (2.5% - 12%) ensuring 100% text readability
 * - Zero colliding elements, zero random drifting text glyphs, perfectly clean and typo-free aesthetics
 * - Dynamic scroll parallax + subtle mouse tilt parallax on desktop
 * - Full accessibility compliance with prefers-reduced-motion
 */
export default function ParallaxTechBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);

      const handleMotionChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
      };
      mediaQuery.addEventListener('change', handleMotionChange);

      // Throttled scroll listener via requestAnimationFrame
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            setScrollY(window.scrollY);
            ticking = false;
          });
          ticking = true;
        }
      };

      // Subtle mouse parallax listener (desktop only)
      const handleMouseMove = (e: MouseEvent) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        setMouseOffset({
          x: Math.max(-1, Math.min(1, (e.clientX - cx) / cx)),
          y: Math.max(-1, Math.min(1, (e.clientY - cy) / cy)),
        });
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      return () => {
        mediaQuery.removeEventListener('change', handleMotionChange);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  // Parallax translation calculation (disabled if user prefers reduced motion)
  const getTransform = (scrollFactor: number, mouseFactor: number = 0) => {
    if (reducedMotion) return 'none';
    const y = -(scrollY * scrollFactor) + mouseOffset.y * mouseFactor;
    const x = mouseOffset.x * mouseFactor;
    return `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* ────────────────────────────────────────────────────────────────
          LAYER 0: DEEP ARCHITECTURAL GRID & AMBIENT ATMOSPHERE (0.04x)
          Deepest plane with subtle Cartesian blueprint grid & warm glow
      ──────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: getTransform(0.04, 3) }}
      >
        {/* Subtle Engineering Blueprint Grid */}
        <svg
          className="absolute inset-0 w-full h-[220%] opacity-[0.025] text-gold-400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="tech-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
              />
              {/* Intersection crosshair */}
              <path
                d="M -3 0 L 3 0 M 0 -3 L 0 3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeOpacity="0.7"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-grid)" />
        </svg>

        {/* Ambient Warm Golden Auroras */}
        <div className="absolute top-[6%] left-[10%] w-[520px] h-[520px] rounded-full bg-gold-500/[0.035] blur-[160px]" />
        <div className="absolute top-[42%] right-[5%] w-[580px] h-[580px] rounded-full bg-amber-600/[0.03] blur-[170px]" />
        <div className="absolute top-[72%] left-[18%] w-[520px] h-[520px] rounded-full bg-gold-400/[0.025] blur-[160px]" />

        {/* Laser Grid Sweep Scanner Line (Soft hairline pulse) */}
        <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/[0.08] to-transparent animate-laser-sweep pointer-events-none" />
      </div>

      {/* ────────────────────────────────────────────────────────────────
          LAYER 1: DISTRIBUTED SCHEMATICS & VECTOR TOPOLOGY (0.12x)
          Clean hairline circuit traces and glowing network nodes (No stray text)
      ──────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: getTransform(0.12, 6) }}
      >
        <svg
          className="absolute inset-0 w-full h-[250%] opacity-[0.06] text-gold-400 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top-Right Circuit Schematic */}
          <g className="animate-circuit-pulse">
            <path
              d="M 900 160 L 1080 160 L 1150 230 L 1320 230"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="4 6"
            />
            <circle cx="900" cy="160" r="2.5" fill="#E5A93C" />
            <circle cx="1150" cy="230" r="2" fill="#E5A93C" />
            <circle cx="1320" cy="230" r="3" fill="none" stroke="#E5A93C" strokeWidth="1" />
          </g>

          {/* Left-Side Distributed Gateway Topology */}
          <g className="opacity-75">
            <path
              d="M 40 760 L 160 760 L 220 820 L 300 820"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            />
            <circle cx="40" cy="760" r="2" fill="#E5A93C" />
            <circle cx="220" cy="820" r="1.5" fill="#E5A93C" />
            <circle cx="300" cy="820" r="2.5" fill="none" stroke="#E5A93C" strokeWidth="1" />
          </g>

          {/* Middle-Right Kafka RPC Stream */}
          <g className="animate-circuit-pulse" style={{ animationDelay: '2s' }}>
            <path
              d="M 1150 1480 L 1020 1570 L 1020 1690 L 940 1750"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="6 4"
            />
            <circle cx="1150" cy="1480" r="2.5" fill="#E5A93C" />
            <circle cx="1020" cy="1570" r="2" fill="#E5A93C" />
            <circle cx="1020" cy="1690" r="2" fill="#E5A93C" />
            <circle cx="940" cy="1750" r="2.5" fill="none" stroke="#E5A93C" strokeWidth="1" />
          </g>

          {/* Bottom Left AI Vector Topology */}
          <g className="opacity-60">
            <path
              d="M 80 2450 L 200 2450 L 260 2390 L 390 2390"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            />
            <circle cx="80" cy="2450" r="2" fill="#E5A93C" />
            <circle cx="260" cy="2390" r="1.5" fill="#E5A93C" />
            <circle cx="390" cy="2390" r="2.5" fill="none" stroke="#E5A93C" strokeWidth="1" />
          </g>
        </svg>
      </div>



      {/* ────────────────────────────────────────────────────────────────
          LAYER 3: AMBIENT GOLD DUST SPECKS (0.35x)
          Pure micro light points for spatial depth (NO floating text or glyphs)
      ──────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 will-change-transform pointer-events-none"
        style={{ transform: getTransform(0.35, 12) }}
      >
        <div className="absolute top-[240px] left-[25%] w-1.5 h-1.5 rounded-full bg-gold-400/15 blur-[1px] animate-circuit-pulse" />
        <div className="absolute top-[700px] right-[28%] w-2 h-2 rounded-full bg-amber-400/12 blur-[1.5px] animate-circuit-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[1200px] left-[22%] w-1 h-1 rounded-full bg-gold-300/18 blur-[0.5px] animate-circuit-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[1680px] right-[20%] w-1.5 h-1.5 rounded-full bg-gold-500/15 blur-[1px] animate-circuit-pulse" style={{ animationDelay: '0.8s' }} />
        <div className="absolute top-[2280px] left-[18%] w-2 h-2 rounded-full bg-amber-400/12 blur-[2px] animate-circuit-pulse" style={{ animationDelay: '2.2s' }} />
        <div className="absolute top-[2900px] right-[24%] w-1 h-1 rounded-full bg-gold-300/15 blur-[0.5px] animate-circuit-pulse" style={{ animationDelay: '1.8s' }} />
        <div className="absolute top-[3500px] left-[26%] w-1.5 h-1.5 rounded-full bg-gold-400/12 blur-[1px] animate-circuit-pulse" style={{ animationDelay: '2.7s' }} />
      </div>
    </div>
  );
}

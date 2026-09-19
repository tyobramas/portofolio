import { useEffect, useState, useMemo } from 'react';

export default function TechParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Normalized scroll progress across first 500px of page scroll
  const progress = useMemo(() => {
    return Math.min(1, Math.max(0, scrollY / 500));
  }, [scrollY]);

  // ── MULTI-LAYER DEPTH PARALLAX SPEEDS ──
  // Layer 1: Deep Nebulae & Tech Matrix Blueprint (0.06x)
  const l1Y = scrollY * 0.06;
  const l1Opacity = Math.max(0.2, 1 - progress * 0.5);

  // Layer 2: Subtle Digital Binary Data Columns (0.12x)
  const l2Y = scrollY * 0.12;
  const l2Opacity = Math.max(0, 1 - progress * 1.05);

  // Layer 3: Peripheral Rail & Minimal Hashes (0.18x)
  const l3Y = scrollY * 0.18;
  const l3Opacity = Math.max(0, 1 - progress * 1.2);

  // Layer 4: Hairline Golden Circuit Bus Traces (0.44x + Disappearing to the right on scroll)
  const l4Y = scrollY * 0.44;
  const l4X = progress * 140;
  const l4Opacity = Math.max(0, 1 - Math.pow(progress, 1.35));

  // Retraction lengths for minimal circuit lines
  const p1Len = 1350;
  const p2Len = 1250;
  const strokeOffset1 = -p1Len * progress * 1.15;
  const strokeOffset2 = -p2Len * progress * 1.12;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none"
      aria-hidden="true"
    >
      {/* ─── LAYER 1: Deep Nebula Flares & Blueprint Matrix (0.06x) ─── */}
      <div
        className="absolute inset-0 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(0, ${l1Y}px, 0)`,
          opacity: l1Opacity,
          willChange: 'transform, opacity',
        }}
      >
        <div className="absolute top-1/4 right-[12%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.07)_0%,rgba(229,169,60,0.05)_45%,transparent_75%)] blur-[110px]" />
        <div className="absolute top-1/3 -left-24 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(229,169,60,0.06)_0%,transparent_65%)] blur-[120px]" />

        {/* Delicate Blueprint Tech Matrix Grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.055]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="luxuryWhisperGrid"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 64 0 L 0 0 0 64"
                fill="none"
                stroke="#E5A93C"
                strokeWidth="0.4"
                strokeDasharray="1 7"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#luxuryWhisperGrid)" />
        </svg>
      </div>

      {/* ─── LAYER 2: Digital Matrix Streams (Binary Rain) (0.12x) ─── */}
      <div
        className="absolute inset-0 transition-transform duration-75 ease-out hidden md:block"
        style={{
          transform: `translate3d(0, ${l2Y}px, 0)`,
          opacity: l2Opacity,
          willChange: 'transform, opacity',
        }}
      >
        <svg
          viewBox="0 0 1440 720"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <g opacity="0.14">
            <line x1="1220" y1="20" x2="1220" y2="340" stroke="#00FFD1" strokeWidth="0.7" strokeDasharray="3 8 1 7 4 6" />
            <line x1="1285" y1="15" x2="1285" y2="310" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="2 6 3 9" />
            <line x1="1350" y1="35" x2="1350" y2="370" stroke="#00FFD1" strokeWidth="0.8" strokeDasharray="4 6 2 8" />
            <line x1="1410" y1="10" x2="1410" y2="330" stroke="#FDE6A3" strokeWidth="0.5" strokeDasharray="2 7 1 8" />
            <line x1="120" y1="140" x2="120" y2="380" stroke="#00FFD1" strokeWidth="0.5" strokeDasharray="3 9 1 6" />
          </g>
        </svg>
      </div>

      {/* ─── LAYER 3: Peripheral Rail & Radar Hashes (0.18x) ─── */}
      <div
        className="absolute inset-0 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(0, ${l3Y}px, 0)`,
          opacity: l3Opacity,
          willChange: 'transform, opacity',
        }}
      >
        <svg
          viewBox="0 0 1440 720"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <g transform="translate(36, 90)" opacity="0.22">
            <line x1="0" y1="0" x2="0" y2="360" stroke="#E5A93C" strokeWidth="0.6" strokeDasharray="4 4" />
            {[0, 60, 120, 180, 240, 300, 360].map((y) => (
              <line key={y} x1="-4" y1={y} x2="6" y2={y} stroke="#F5C869" strokeWidth="0.7" />
            ))}
            <path d="M -8,8 L -8,0 L 0,0" fill="none" stroke="#E5A93C" strokeWidth="0.8" />
            <path d="M -8,352 L -8,360 L 0,360" fill="none" stroke="#E5A93C" strokeWidth="0.8" />
          </g>
        </svg>
      </div>



      {/* ─── LAYER 4: Ultra-Fine Hairline Bus Conduits (0.44x + Disappearing Scroll) ─── */}
      <div
        className="absolute inset-0 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${l4X}px, ${l4Y}px, 0)`,
          opacity: l4Opacity,
          willChange: 'transform, opacity',
        }}
      >
        <svg
          viewBox="0 0 1440 720"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="whisperGoldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C58A22" stopOpacity="0.04" />
              <stop offset="30%" stopColor="#E5A93C" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#F5C869" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFF2B8" stopOpacity="0.35" />
            </linearGradient>

            <linearGradient id="whisperCyanGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E5A93C" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#00FFD1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FDE6A3" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Line 1: Ultra-Thin Primary Bus Line (0.7px Hairline) */}
          <path
            d="M -40,160 L 200,160 L 300,240 L 660,240 L 760,330 L 1060,330 L 1160,400 L 1480,400"
            fill="none"
            stroke="url(#whisperGoldGradient)"
            strokeWidth="0.7"
            strokeDasharray={p1Len}
            strokeDashoffset={strokeOffset1}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 80ms ease-out' }}
          />

          {/* Line 2: Ultra-Thin Cyan-Gold Accent Trace (0.6px Hairline) */}
          <path
            d="M 20,190 L 190,190 L 290,270 L 650,270 L 750,360 L 1040,360 L 1130,425 L 1440,425"
            fill="none"
            stroke="url(#whisperCyanGold)"
            strokeWidth="0.6"
            strokeDasharray={p2Len}
            strokeDashoffset={strokeOffset2}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 80ms ease-out' }}
          />

          <circle cx="1060" cy="330" r="2" fill="#FFF2B8" opacity={0.5 * (1 - progress)} />
        </svg>
      </div>
    </div>
  );
}

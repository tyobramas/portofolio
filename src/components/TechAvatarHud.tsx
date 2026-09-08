import { useEffect, useRef, useState, useMemo } from 'react';

interface TechAvatarHudProps {
  imageSrc: string;
  alt: string;
  sizeClassName?: string;
}

export default function TechAvatarHud({
  imageSrc,
  alt,
  sizeClassName = 'w-[320px] h-[320px] sm:w-[410px] sm:h-[410px] md:w-[460px] md:h-[460px] lg:w-[490px] lg:h-[490px] xl:w-[510px] xl:h-[510px]',
}: TechAvatarHudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position exclusively — starts at 0 at page top, zero idle animation
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
    // Initialize immediately
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 8 Clean precision radial calibration ticks (45° increments)
  // 100% concentric around SVG center (300, 300)
  const ticks = useMemo(() => {
    const list = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * 360) / 8;
      const rad = (angle * Math.PI) / 180;
      const isCardinal = i % 2 === 0; // 0, 90, 180, 270 deg
      const rInner = isCardinal ? 266 : 270;
      const rOuter = isCardinal ? 284 : 280;

      list.push({
        id: i,
        x1: 300 + rInner * Math.cos(rad),
        y1: 300 + rInner * Math.sin(rad),
        x2: 300 + rOuter * Math.cos(rad),
        y2: 300 + rOuter * Math.sin(rad),
        isCardinal,
      });
    }
    return list;
  }, []);

  // Pure scroll-driven rotational parallax — preserves 100% concentricity at all angles!
  const outerRotate = scrollY * 0.12;
  const midRotate = -scrollY * 0.18;
  const innerRotate = scrollY * 0.08;

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${sizeClassName}`}
      style={{
        aspectRatio: '1 / 1',
      }}
    >
      {/* ─── LAYER 0: Subtle Golden Bloom Behind Rings ─── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[76%] h-[76%] rounded-full bg-amber-500/15 blur-[60px] pointer-events-none"
      />

      {/* ─── LAYER 1: Outer Calibration Dial (Rotates ONLY on Scroll) ─── */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `rotate(${outerRotate}deg)`,
          transformOrigin: '50% 50%',
        }}
      >
        <svg
          viewBox="0 0 600 600"
          className="w-full h-full"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(229, 169, 60, 0.4))',
          }}
        >
          <defs>
            <linearGradient id="goldGradientDial" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE6A3" />
              <stop offset="50%" stopColor="#E5A93C" />
              <stop offset="100%" stopColor="#C58A22" />
            </linearGradient>
          </defs>

          {/* Clean Outer Hairline Circle (r=275, center 300, 300) */}
          <circle
            cx="300"
            cy="300"
            r="275"
            fill="none"
            stroke="#E5A93C"
            strokeWidth="1.2"
            strokeOpacity="0.45"
          />

          {/* 8 Precision Calibration Ticks */}
          {ticks.map((t) => (
            <line
              key={t.id}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.isCardinal ? '#FFDF78' : '#E5A93C'}
              strokeWidth={t.isCardinal ? 2 : 1.2}
              strokeOpacity={t.isCardinal ? 0.9 : 0.6}
            />
          ))}

          {/* 4 Cardinal Subtle Anchor Dots (r=276 from center 300, 300) */}
          <circle cx="300" cy="24" r="2.5" fill="#FFDF78" />
          <circle cx="576" cy="300" r="2.5" fill="#FFDF78" />
          <circle cx="300" cy="576" r="2.5" fill="#FFDF78" />
          <circle cx="24" cy="300" r="2.5" fill="#FFDF78" />
        </svg>
      </div>

      {/* ─── LAYER 2: Mid Segmented Tech Arcs (Counter-Rotates ONLY on Scroll) ─── */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `rotate(${midRotate}deg)`,
          transformOrigin: '50% 50%',
        }}
      >
        <svg
          viewBox="0 0 600 600"
          className="w-full h-full"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(245, 200, 105, 0.45))',
          }}
        >
          <defs>
            <linearGradient id="goldGradientArcs" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE6A3" />
              <stop offset="50%" stopColor="#E5A93C" />
              <stop offset="100%" stopColor="#C58A22" />
            </linearGradient>
          </defs>

          {/* Dual Segmented Curved Energy Arcs (r=252, centered 300, 300) */}
          <circle
            cx="300"
            cy="300"
            r="252"
            fill="none"
            stroke="url(#goldGradientArcs)"
            strokeWidth="4"
            strokeDasharray="20 8"
            strokeDashoffset="12"
            strokeOpacity="0.85"
            style={{
              clipPath: 'polygon(50% 50%, 100% 0%, 100% 70%, 50% 50%)',
            }}
          />

          <circle
            cx="300"
            cy="300"
            r="252"
            fill="none"
            stroke="url(#goldGradientArcs)"
            strokeWidth="4"
            strokeDasharray="20 8"
            strokeDashoffset="12"
            strokeOpacity="0.85"
            style={{
              clipPath: 'polygon(50% 50%, 0% 30%, 0% 100%, 50% 50%)',
            }}
          />

          {/* Concentric Slim Ring with 4 Minimalist Gaps (r=240, centered 300, 300) */}
          <circle
            cx="300"
            cy="300"
            r="240"
            fill="none"
            stroke="#F5C869"
            strokeWidth="1"
            strokeDasharray="140 25"
            strokeOpacity="0.5"
          />
        </svg>
      </div>

      {/* ─── LAYER 3: Inner Delicate Dotted Gyro Ring (Rotates ONLY on Scroll) ─── */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `rotate(${innerRotate}deg)`,
          transformOrigin: '50% 50%',
        }}
      >
        <svg viewBox="0 0 600 600" className="w-full h-full">
          {/* Dotted Gyro Ring (r=226, centered 300, 300) */}
          <circle
            cx="300"
            cy="300"
            r="226"
            fill="none"
            stroke="#FDE6A3"
            strokeWidth="1.2"
            strokeDasharray="6 8"
            strokeOpacity="0.5"
          />
        </svg>
      </div>

      {/* ─── LAYER 4: Avatar Portrait Portal (Mathematically Anchored to Center 50% 50%) ─── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-gradient-to-b from-[#181C26] via-[#0F121A] to-[#07080B] shadow-2xl z-10"
        style={{
          width: '71%',
          height: '71%',
        }}
      >
        {/* Soft Golden Backlight Aura */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(229,169,60,0.22)_0%,transparent_70%)] pointer-events-none" />

        {/* Developer Portrait with Exact Optical & Geometric Center Framing */}
        <img
          src={imageSrc}
          alt={alt}
          className="h-full w-full object-cover object-center select-none"
          loading="eager"
        />
      </div>

      {/* ─── LAYER 5: Prestigious Gold Frame Bezel (Solid & Glow in SVG - Sits on Top of Portal Edge) ─── */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <svg viewBox="0 0 600 600" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="goldGradientBezel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B8" />
              <stop offset="35%" stopColor="#F5C869" />
              <stop offset="70%" stopColor="#E5A93C" />
              <stop offset="100%" stopColor="#C58A22" />
            </linearGradient>
          </defs>

          {/* Solid Gold Bezel Ring (r=214, width=3.5) */}
          <circle
            cx="300"
            cy="300"
            r="214"
            fill="none"
            stroke="url(#goldGradientBezel)"
            strokeWidth="3.5"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(229, 169, 60, 0.7)) drop-shadow(0 0 25px rgba(229, 169, 60, 0.35))',
            }}
          />
        </svg>
      </div>
    </div>
  );
}

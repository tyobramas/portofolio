import { useRef, useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  category: string;
  bgPastel: string;
  glowColor: string;
  borderColor: string;
  iconUrl: string;
}

const TECH_SATELLITES: TechItem[] = [
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'Mobile Apps (iOS & Android)',
    bgPastel: '#FFFFFF',
    glowColor: 'rgba(2, 132, 199, 0.4)',
    borderColor: '#0284C7',
    iconUrl: '/images/tech/flutter.svg',
  },
  {
    id: 'react',
    name: 'React / TS',
    category: 'Modern Web Frontend',
    bgPastel: '#FFFFFF',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    borderColor: '#0284C7',
    iconUrl: '/images/tech/react.svg',
  },
  {
    id: 'laravel',
    name: 'Laravel',
    category: 'Enterprise Backend & APIs',
    bgPastel: '#FFFFFF',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    borderColor: '#E11D48',
    iconUrl: '/images/tech/laravel.svg',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'High-Throughput Services',
    bgPastel: '#FFFFFF',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    borderColor: '#16A34A',
    iconUrl: '/images/tech/nodejs.svg',
  },
  {
    id: 'python',
    name: 'Python / AI',
    category: 'Autonomous Agents & LLMs',
    bgPastel: '#FFFFFF',
    glowColor: 'rgba(234, 179, 8, 0.4)',
    borderColor: '#CA8A04',
    iconUrl: '/images/tech/python.svg',
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'High-Concurrency DB Architecture',
    bgPastel: '#FFFFFF',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    borderColor: '#2563EB',
    iconUrl: '/images/tech/postgresql.svg',
  },
];

interface TechOrbitAvatarProps {
  avatarUrl: string;
  ownerName: string;
  ownerSubtitle?: string;
  ownerLocation?: string;
}

export default function TechOrbitAvatar({
  avatarUrl,
  ownerName,
  ownerSubtitle,
  ownerLocation,
}: TechOrbitAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const satellitesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeTooltip, setActiveTooltip] = useState<TechItem | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    let animId: number;
    let angle = 0;

    // Check media query for prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateOrbit = () => {
      // Responsive orbit radii (perfectly tuned so all 6 satellites stay visible & clear the avatar):
      // Mobile (< 640px): rx = 110px, ry = 68px
      // Desktop (>= 640px): rx = 140px, ry = 78px
      const isMobile = window.innerWidth < 640;
      const rx = isMobile ? 110 : 140;
      const ry = isMobile ? 68 : 78;

      if (!isHoveredRef.current && !prefersReducedMotion) {
        // Smooth meditative planetary rotation (~24s per full 360° turn)
        angle = (angle + 0.25) % 360;
      }

      const rad = (angle * Math.PI) / 180;
      const count = TECH_SATELLITES.length;

      satellitesRef.current.forEach((el, index) => {
        if (!el) return;
        const itemAngle = rad + (index * 2 * Math.PI) / count;

        // Elliptical planar coordinates
        const x = Math.cos(itemAngle) * rx;
        const y = Math.sin(itemAngle) * ry;

        // Depth perception along vertical/Z axis:
        // sin(itemAngle) ranges from -1 (farthest behind) to +1 (closest in front)
        const depth = Math.sin(itemAngle);

        // Scale: 0.88 at back, 1.12 at front
        const scale = 0.88 + (depth + 1) * 0.12;

        // Opacity: 0.80 at back, 1.0 at front
        const opacity = 0.8 + (depth + 1) * 0.1;

        // Depth sorting: Behind avatar when depth < 0, in front when depth >= 0
        const zIndex = depth > 0 ? 30 : 10;

        // Mathematical centering: translate(-50%, -50%) guarantees exact center alignment
        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        el.style.zIndex = String(zIndex);
        el.style.opacity = String(opacity);
      });

      animId = requestAnimationFrame(updateOrbit);
    };

    animId = requestAnimationFrame(updateOrbit);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[340px] sm:max-w-[370px] rounded-3xl border-3 border-zinc-900 bg-white/80 backdrop-blur-md p-5 sm:p-7 shadow-[0_8px_0_0_#18181B] flex flex-col items-center text-center overflow-visible select-none mx-auto"
    >
      {/* ── 3D Tech Orbit Arena (Aang God Mode / Planetary Tech Halo) ── */}
      <div
        className="relative w-full max-w-[280px] sm:max-w-[320px] h-[216px] sm:h-[244px] flex items-center justify-center mx-auto"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          setActiveTooltip(null);
        }}
      >
        {/* Ambient Warm Golden Aura Glow behind Avatar */}
        <div
          className="pointer-events-none absolute w-36 h-36 rounded-full bg-gradient-to-tr from-amber-300/30 via-orange-300/20 to-pink-300/25 blur-2xl z-0"
          aria-hidden="true"
        />

        {/* ── 6 Orbiting Tech Stack Satellites (100% Real Official Brand Logos) ── */}
        {TECH_SATELLITES.map((tech, index) => (
          <div
            key={tech.id}
            ref={(el) => {
              satellitesRef.current[index] = el;
            }}
            onMouseEnter={() => setActiveTooltip(tech)}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute left-1/2 top-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-zinc-900 bg-white flex items-center justify-center cursor-pointer transition-shadow duration-200 shadow-[0_3px_0_0_#18181B] hover:shadow-[0_5px_0_0_#18181B] will-change-transform"
            style={{
              boxShadow: `0 3px 0 0 #18181B, 0 0 14px ${tech.glowColor}`,
            }}
            title={`${tech.name} — ${tech.category}`}
          >
            <img
              src={tech.iconUrl}
              alt={tech.name}
              className="w-6 h-6 sm:w-6.5 sm:h-6.5 object-contain pointer-events-none select-none drop-shadow-sm"
              loading="eager"
              draggable={false}
            />
          </div>
        ))}

        {/* ── Central Hero Portrait ── */}
        <div className="relative z-20">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-[#FFF7ED] overflow-hidden flex items-end justify-center">
            <img
              src={avatarUrl}
              alt={ownerName}
              className="w-full h-full object-cover object-center scale-105 origin-bottom select-none pointer-events-none"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* ── Interactive Floating Tooltip Pill (Shows on Hover) ── */}
        <div
          className={`pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 z-40 px-3.5 py-1 rounded-full border-2 border-zinc-900 bg-zinc-950 text-white text-[11px] font-mono font-bold shadow-[0_3px_0_0_#18181B] whitespace-nowrap transition-all duration-200 ${
            activeTooltip
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-2'
          }`}
        >
          {activeTooltip && (
            <span className="flex items-center gap-2">
              <img
                src={activeTooltip.iconUrl}
                alt={activeTooltip.name}
                className="w-4 h-4 object-contain shrink-0"
              />
              <span className="text-amber-300 font-extrabold">{activeTooltip.name}</span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-200 font-medium">{activeTooltip.category}</span>
            </span>
          )}
        </div>
      </div>

      {/* ── Bawah Foto: Seperti Awal (Tanpa Metrik Redundan) ── */}
      <div className="mt-2 space-y-1">
        <h3 className="font-sans text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
          {ownerName}
        </h3>

        <p className="text-xs sm:text-[13px] font-bold text-pink-600">
          {ownerSubtitle || 'Senior Full-Stack · Mobile · AI Systems Engineer'}
        </p>

        <div className="pt-1 flex items-center justify-center gap-1.5 text-xs text-zinc-600 font-semibold">
          <MapPin size={13} className="text-zinc-500 shrink-0" />
          <span>{ownerLocation || 'Jakarta, Indonesia'} · Worldwide Remote</span>
        </div>
      </div>
    </div>
  );
}

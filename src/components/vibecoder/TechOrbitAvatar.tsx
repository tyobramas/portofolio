import { useRef, useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  category: string;
  bgPastel: string;
  glowColor: string;
  borderColor: string;
  svg: (color: string) => JSX.Element;
}

const TECH_SATELLITES: TechItem[] = [
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'Mobile Apps (iOS & Android)',
    bgPastel: '#E0F2FE', // Pastel Sky
    glowColor: 'rgba(2, 132, 199, 0.3)',
    borderColor: '#0284C7',
    svg: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
        <path d="M14.314 0L2.3 12 6.07 15.772 21.856 0h-7.542z" fill="#0284C7" />
        <path d="M14.156 12.002L8.337 17.82l3.771 3.772 2.046-2.046 5.702-5.702h-5.702v-.002z" fill="#0369A1" />
        <path d="M17.927 15.774L14.156 12l-2.046 2.046 3.771 3.772 2.046-2.044z" fill="#38BDF8" />
        <path d="M8.337 17.82l3.772 3.772L8.337 24H.795l7.542-6.18z" fill="#0284C7" />
      </svg>
    ),
  },
  {
    id: 'react',
    name: 'React / TS',
    category: 'Modern Web Frontend',
    bgPastel: '#E0F2FE', // Pastel Cyan
    glowColor: 'rgba(56, 189, 248, 0.35)',
    borderColor: '#0284C7',
    svg: () => (
      <svg viewBox="-11.5 -10.23 23 20.46" className="w-5 h-5 shrink-0">
        <circle cx="0" cy="0" r="2.05" fill="#0284C7" />
        <g stroke="#0284C7" strokeWidth="1.1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    id: 'laravel',
    name: 'Laravel',
    category: 'Enterprise Backend & APIs',
    bgPastel: '#FFE4E6', // Pastel Coral
    glowColor: 'rgba(244, 63, 94, 0.35)',
    borderColor: '#E11D48',
    svg: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="#E11D48">
        <path d="M8.2 3.2L3.5 6v12l4.7 2.8 4.7-2.8V6L8.2 3.2zm-.1 2.2l3 1.8-3 1.8-3-1.8 3-1.8zM4.7 7.7l3 1.8v3.6l-3-1.8V7.7zm7.6 0v3.6l-3 1.8V9.5l3-1.8zm3.9-3.2l-3 1.8 3 1.8 3-1.8-3-1.8zm-1.8 4.5l3-1.8 3 1.8v3.6l-3 1.8V9zm3 3.6l-3-1.8v-3.6l3 1.8v3.6z" />
      </svg>
    ),
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'High-Throughput Services',
    bgPastel: '#DCFCE7', // Pastel Emerald
    glowColor: 'rgba(34, 197, 94, 0.35)',
    borderColor: '#16A34A',
    svg: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="#16A34A">
        <path d="M12 2L2.5 7.5v11L12 24l9.5-5.5v-11L12 2zm0 2.3l7.5 4.3v8.8L12 21.7l-7.5-4.3V8.6L12 4.3zm0 4.7a3 3 0 00-3 3v2a3 3 0 003 3 3 3 0 003-3v-2a3 3 0 00-3-3z" />
      </svg>
    ),
  },
  {
    id: 'python',
    name: 'Python / AI',
    category: 'Autonomous Agents & LLMs',
    bgPastel: '#FEF9C3', // Pastel Yellow
    glowColor: 'rgba(234, 179, 8, 0.35)',
    borderColor: '#CA8A04',
    svg: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
        <path
          d="M11.9 2c-4.4 0-4.1 1.9-4.1 1.9l.01 2h4.2v.6H6.1S3.3 6.2 3.3 10.6s2.5 4.3 2.5 4.3h1.5v-2.1s-.1-2.5 2.5-2.5h4.2s2.4.04 2.4-2.4V4.4S16.7 2 11.9 2zm-2.4 1.3a.8.8 0 110 1.6.8.8 0 010-1.6z"
          fill="#0284C7"
        />
        <path
          d="M12.1 22c4.4 0 4.1-1.9 4.1-1.9l-.01-2h-4.2v-.6h5.9s2.8.3 2.8-4.1-2.5-4.3-2.5-4.3h-1.5v2.1s.1 2.5-2.5 2.5h-4.2s-2.4-.04-2.4 2.4v3.5s-.3 2.4 4.5 2.4zm2.4-1.3a.8.8 0 110-1.6.8.8 0 010 1.6z"
          fill="#EAB308"
        />
      </svg>
    ),
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'High-Concurrency DB Architecture',
    bgPastel: '#DBEAFE', // Pastel Slate Blue
    glowColor: 'rgba(59, 130, 246, 0.35)',
    borderColor: '#2563EB',
    svg: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="#2563EB">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.2 15.6c-.6.2-1.3.3-2 .3-2.4 0-4.3-1.6-4.7-3.9h2c.3 1.2 1.4 2.1 2.7 2.1.4 0 .8-.1 1.2-.2l.8 1.7zm3.1-4.8c-.2 1.8-1.5 3.3-3.3 3.8l-.8-1.7c1.1-.3 1.9-1.2 2-2.3h2.1zM12 5.5c2.3 0 4.3 1.4 5.1 3.4l-1.9.8c-.5-1.3-1.8-2.2-3.2-2.2s-2.7.9-3.2 2.2l-1.9-.8C7.7 6.9 9.7 5.5 12 5.5z" />
      </svg>
    ),
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
      // Responsive orbit radii:
      // Mobile (< 640px): rx = 105px, ry = 48px
      // Desktop (>= 640px): rx = 135px, ry = 62px
      const isMobile = window.innerWidth < 640;
      const rx = isMobile ? 105 : 135;
      const ry = isMobile ? 48 : 62;

      if (!isHoveredRef.current && !prefersReducedMotion) {
        // Slow meditative rotation (~24 seconds per full 360° turn)
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

        // Scale: 0.86 at back, 1.12 at front
        const scale = 0.86 + (depth + 1) * 0.13;

        // Opacity: 0.70 at back, 1.0 at front
        const opacity = 0.7 + (depth + 1) * 0.15;

        // Depth sorting: Behind avatar when depth < 0, in front when depth >= 0
        const zIndex = depth > 0 ? 30 : 5;

        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
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
      className="relative rounded-3xl border-3 border-zinc-900 bg-white/70 backdrop-blur-md p-6 sm:p-7 shadow-[0_8px_0_0_#18181B] flex flex-col items-center text-center overflow-visible select-none"
    >
      {/* ── 3D Tech Orbit Arena (Aang God Mode / Planetary Tech Halo) ── */}
      <div
        className="relative w-64 h-52 sm:w-72 sm:h-56 flex items-center justify-center my-1"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          setActiveTooltip(null);
        }}
      >
        {/* Subtle Orbital Halo Trajectory Ring */}
        <div
          className="pointer-events-none absolute w-[210px] h-[96px] sm:w-[270px] sm:h-[124px] rounded-full border-2 border-dashed border-zinc-900/15"
          style={{ transform: 'rotate(-4deg)' }}
          aria-hidden="true"
        />

        {/* Ambient Warm Golden Aura Glow behind Avatar */}
        <div
          className="pointer-events-none absolute w-36 h-36 rounded-full bg-gradient-to-tr from-amber-300/30 via-orange-300/20 to-pink-300/25 blur-2xl z-0"
          aria-hidden="true"
        />

        {/* ── 6 Orbiting Tech Stack Satellites ── */}
        {TECH_SATELLITES.map((tech, index) => (
          <div
            key={tech.id}
            ref={(el) => {
              satellitesRef.current[index] = el;
            }}
            onMouseEnter={() => setActiveTooltip(tech)}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute left-1/2 top-1/2 -ml-5 -mt-5 sm:-ml-5.5 sm:-mt-5.5 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-zinc-900 flex items-center justify-center cursor-pointer transition-shadow duration-200 shadow-[0_3px_0_0_#18181B] hover:shadow-[0_5px_0_0_#18181B] will-change-transform"
            style={{
              backgroundColor: tech.bgPastel,
              boxShadow: `0 3px 0 0 #18181B, 0 0 14px ${tech.glowColor}`,
            }}
            title={`${tech.name} — ${tech.category}`}
          >
            {tech.svg(tech.borderColor)}
          </div>
        ))}

        {/* ── Central Hero Portrait ── */}
        <div className="relative z-15">
          <img
            src={avatarUrl}
            alt={ownerName}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-3 border-zinc-900 object-cover shadow-[0_6px_0_0_#18181B] bg-[#FFF7ED]"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* Active Live Pulse Badge */}
          <span className="absolute -bottom-2 -right-2 flex items-center gap-1.5 rounded-full border-2 border-zinc-900 bg-emerald-400 px-2.5 py-0.5 text-[10px] font-black uppercase text-zinc-950 shadow-[0_2px_0_0_#18181B]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-950 animate-ping" />
            Active
          </span>
        </div>

        {/* ── Interactive Floating Tooltip Pill (Shows on Hover) ── */}
        <div
          className={`pointer-events-none absolute -bottom-3 z-40 px-3 py-1 rounded-full border-2 border-zinc-900 bg-zinc-950 text-white text-[11px] font-mono font-bold shadow-[0_3px_0_0_#18181B] transition-all duration-200 ${
            activeTooltip
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-2'
          }`}
        >
          {activeTooltip && (
            <span className="flex items-center gap-1.5">
              <span className="text-[#38BDF8]">{activeTooltip.name}</span>
              <span className="text-zinc-400">·</span>
              <span className="text-zinc-200">{activeTooltip.category}</span>
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

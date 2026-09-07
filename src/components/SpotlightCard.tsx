import React, { useRef, useState } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
  showTechCorners?: boolean;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(229, 169, 60, 0.14)',
  borderColor = 'rgba(229, 169, 60, 0.35)',
  showTechCorners = true,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setOpacity(1);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-[#232736] bg-gradient-to-b from-[#131622] via-[#10121A] to-[#0D0E15] transition-all duration-300 hover:border-gold-500/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_10px_30px_-10px_rgba(0,0,0,0.7)] hover:shadow-[inset_0_1px_0_0_rgba(245,200,105,0.22),0_16px_40px_-10px_rgba(0,0,0,0.8),0_0_25px_rgba(229,169,60,0.12)] ${className}`}
      {...props}
    >
      {/* Specular Radial Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 75%)`,
        }}
      />

      {/* Dynamic Specular Border Sheen */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(280px circle at ${position.x}px ${position.y}px, ${borderColor}, transparent 70%)`,
          maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {/* Top Hairline Specular Accent */}
      <div className="pointer-events-none absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent opacity-40 group-hover:opacity-100 group-hover:via-gold-400/75 transition-all duration-300 z-20" />

      {/* Bottom Ambient Reflection Accent */}
      <div className="pointer-events-none absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Precision Tech Corner Framing (Pure SVG Vector Brackets, Zero Text) */}
      {showTechCorners && (
        <div className="pointer-events-none absolute inset-0 z-20 select-none" aria-hidden="true">
          {/* Top-Left Reticle */}
          <svg className="absolute top-2.5 left-2.5 w-2.5 h-2.5 text-gold-500/30 group-hover:text-gold-400/70 transition-colors" viewBox="0 0 10 10" fill="none">
            <path d="M1 8V2a1 1 0 0 1 1-1h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {/* Top-Right Reticle */}
          <svg className="absolute top-2.5 right-2.5 w-2.5 h-2.5 text-gold-500/30 group-hover:text-gold-400/70 transition-colors" viewBox="0 0 10 10" fill="none">
            <path d="M9 8V2a1 1 0 0 0-1-1H2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {/* Bottom-Left Reticle */}
          <svg className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 text-gold-500/30 group-hover:text-gold-400/70 transition-colors" viewBox="0 0 10 10" fill="none">
            <path d="M1 2v6a1 1 0 0 0 1 1h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {/* Bottom-Right Reticle */}
          <svg className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 text-gold-500/30 group-hover:text-gold-400/70 transition-colors" viewBox="0 0 10 10" fill="none">
            <path d="M9 2v6a1 1 0 0 1-1 1H2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}

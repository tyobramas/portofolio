import React, { useRef, useState } from 'react';
import { ArrowRight, Eye, Paperclip, Clock, Sparkles } from 'lucide-react';
import type { Article } from '../types';

interface ArticleCard3DProps {
  article: Article;
  onClick: () => void;
}

export default function ArticleCard3D({ article, onClick }: ArticleCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt (max 8 degrees for a refined, professional feel)
    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotation({ x: rotX, y: rotY });
    setSpotlightPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  // Determine read count badge formatting
  const reads = article.readCount || 0;
  const isNew = reads < 20;

  return (
    <div
      className="group relative cursor-pointer select-none perspective-[1000px] h-full"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="relative flex flex-col h-full rounded-xl border border-[#232736] bg-gradient-to-b from-[#131622] via-[#0F1118] to-[#0A0B10] p-5 sm:p-6 transition-all duration-300 ease-out hover:border-gold-500/50 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.85),0_0_25px_rgba(229,169,60,0.12)] will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered
            ? `rotateX(${rotation.x.toFixed(2)}deg) rotateY(${rotation.y.toFixed(2)}deg) translateZ(10px) scale3d(1.015, 1.015, 1.015)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)',
        }}
      >
        {/* Dynamic Specular Spotlight Follower */}
        <div
          className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(229, 169, 60, 0.16), transparent 75%)`,
          }}
        />

        {/* Dynamic Specular Border Sheen */}
        <div
          className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(240px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(229, 169, 60, 0.4), transparent 70%)`,
            maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }}
        />

        {/* Top Hairline Gold Accent */}
        <div className="pointer-events-none absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent opacity-40 group-hover:opacity-100 group-hover:via-gold-400/80 transition-all duration-300 z-20" />

        {/* Precision Tech Corner Reticles */}
        <div className="pointer-events-none absolute inset-0 z-20 select-none" aria-hidden="true">
          <svg className="absolute top-2.5 left-2.5 w-2 h-2 text-gold-500/30 group-hover:text-gold-400/70 transition-colors" viewBox="0 0 10 10" fill="none">
            <path d="M1 8V2a1 1 0 0 1 1-1h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <svg className="absolute top-2.5 right-2.5 w-2 h-2 text-gold-500/30 group-hover:text-gold-400/70 transition-colors" viewBox="0 0 10 10" fill="none">
            <path d="M9 8V2a1 1 0 0 0-1-1H2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <svg className="absolute bottom-2.5 left-2.5 w-2 h-2 text-gold-500/30 group-hover:text-gold-400/70 transition-colors" viewBox="0 0 10 10" fill="none">
            <path d="M1 2v6a1 1 0 0 0 1 1h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <svg className="absolute bottom-2.5 right-2.5 w-2 h-2 text-gold-500/30 group-hover:text-gold-400/70 transition-colors" viewBox="0 0 10 10" fill="none">
            <path d="M9 2v6a1 1 0 0 1-1 1H2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>

        {/* ─── LAYER 1: Header Category & Telemetry (translateZ: 25px) ─── */}
        <div
          className="relative z-20 flex items-center justify-between gap-2 mb-3.5"
          style={{ transform: isHovered ? 'translateZ(25px)' : 'none', transition: 'transform 0.25s ease-out' }}
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase text-gold-300 bg-gold-500/10 border border-gold-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              {article.category}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-ink-300">
            <span className="inline-flex items-center gap-1 text-ink-400">
              <Clock size={11} className="text-gold-400/70" />
              {article.readTime || '5 min read'}
            </span>
          </div>
        </div>

        {/* ─── LAYER 2: Title & Excerpt (translateZ: 38px) ─── */}
        <div
          className="relative z-20 flex-1 flex flex-col justify-start mb-4"
          style={{ transform: isHovered ? 'translateZ(38px)' : 'none', transition: 'transform 0.25s ease-out' }}
        >
          <h3 className="font-sans text-base sm:text-lg font-bold text-white group-hover:text-gold-300 transition-colors duration-200 line-clamp-2 leading-snug tracking-tight mb-2">
            {article.title}
          </h3>

          <p className="font-sans text-xs text-ink-300 line-clamp-2 leading-relaxed font-normal">
            {article.excerpt}
          </p>
        </div>

        {/* ─── LAYER 3: Tags & Telemetry Footer (translateZ: 48px) ─── */}
        <div
          className="relative z-20 pt-3.5 border-t border-[#1C202C] flex items-center justify-between gap-3 mt-auto"
          style={{ transform: isHovered ? 'translateZ(48px)' : 'none', transition: 'transform 0.25s ease-out' }}
        >
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            {/* Reads Telemetry Pill */}
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold ${
                isNew
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                  : 'bg-[#151924] text-cyan-300 border border-cyan-500/20'
              }`}
              title={`${reads} recorded readers`}
            >
              {isNew ? (
                <>
                  <Sparkles size={10} className="text-emerald-400" />
                  <span>NEW</span>
                </>
              ) : (
                <>
                  <Eye size={10} className="text-cyan-400" />
                  <span>{reads} READS</span>
                </>
              )}
            </span>

            {/* Document Attachment Pill if article has file */}
            {article.attachments && article.attachments.length > 0 && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium text-gold-300/90 bg-[#161822] border border-gold-500/20"
                title={`${article.attachments.length} downloadable attachment available`}
              >
                <Paperclip size={10} className="text-gold-400" />
                <span className="hidden sm:inline">PDF</span>
              </span>
            )}
          </div>

          {/* Action Read Link */}
          <div className="flex items-center gap-1 text-xs font-mono font-semibold text-gold-400 group-hover:text-gold-300 transition-colors shrink-0">
            <span>READ</span>
            <ArrowRight
              size={13}
              className="transform transition-transform duration-200 group-hover:translate-x-1 text-gold-accent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

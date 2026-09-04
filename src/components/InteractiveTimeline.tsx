import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Briefcase, GraduationCap, Trophy,
  MapPin, CheckCircle2, Award,
  Sparkles, ChevronRight, ChevronLeft, ArrowRight, type LucideIcon
} from 'lucide-react';
import type { Milestone, MilestoneType } from '../types';

interface InteractiveTimelineProps {
  milestones: Milestone[];
}

const TYPE_CONFIG: Record<MilestoneType, { label: string; icon: LucideIcon; color: string; border: string; glow: string; bg: string; pinBg: string }> = {
  role: {
    label: 'Leadership Role',
    icon: Briefcase,
    color: 'text-cyan-300',
    border: 'border-cyan-400/40 hover:border-cyan-300',
    glow: 'from-cyan-500/20 via-sky-500/10 to-transparent',
    bg: 'bg-cyan-950/80',
    pinBg: 'bg-cyan-400',
  },
  education: {
    label: 'Academic Degree',
    icon: GraduationCap,
    color: 'text-emerald-300',
    border: 'border-emerald-400/40 hover:border-emerald-300',
    glow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    bg: 'bg-emerald-950/80',
    pinBg: 'bg-emerald-400',
  },
  achievement: {
    label: 'Key Milestone',
    icon: Trophy,
    color: 'text-amber-300',
    border: 'border-amber-400/40 hover:border-amber-300',
    glow: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    bg: 'bg-amber-950/80',
    pinBg: 'bg-amber-400',
  },
  project: {
    label: 'Core System',
    icon: Sparkles,
    color: 'text-purple-300',
    border: 'border-purple-400/40 hover:border-purple-300',
    glow: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    bg: 'bg-purple-950/80',
    pinBg: 'bg-purple-400',
  },
};

const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({ milestones }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  // Pinned scroll hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transform vertical scroll progress into horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-65%']);

  const scrollLeft = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="timeline"
      aria-label="Professional Journey"
      ref={containerRef}
      className="relative h-[250vh] bg-transparent"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-14 sm:top-16 h-[86vh] sm:h-[88vh] flex flex-col justify-between py-6 px-4 max-w-7xl mx-auto overflow-hidden">
        
        {/* Section Header */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-sans text-[11px] font-semibold tracking-wider uppercase mb-1">
                <Award size={12} className="text-cyan-400" />
                <span>Continuous Engineering Career Trajectory (2013 — Present)</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Career Roadmap & Milestones
              </h2>
            </div>

            {/* Navigation Controls & Guidance */}
            <div className="flex items-center gap-3">
              <span className="font-sans text-xs text-cyan-300 flex items-center gap-1 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/60 hidden sm:flex">
                <span>Scroll to glide timeline</span>
                <ArrowRight size={13} />
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={scrollLeft}
                  aria-label="Scroll timeline left"
                  className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/70 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={scrollRight}
                  aria-label="Scroll timeline right"
                  className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/70 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Timeline Global Progress Track */}
          <div className="w-full h-1 bg-slate-800/90 rounded-full overflow-hidden mb-4">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 shadow-[0_0_12px_rgba(56,189,248,0.7)]"
            />
          </div>
        </div>

        {/* Chronological Horizontal Timeline Rail & Connecting Cards Track */}
        <div
          ref={scrollTrackRef}
          className="relative flex-1 flex flex-col justify-center overflow-x-auto no-scrollbar scroll-smooth"
        >
          <motion.div
            style={{ x }}
            className="relative flex items-start gap-8 pl-4 pr-16 will-change-transform pt-6 pb-2"
          >
            {/* The Continuous Glowing Horizontal Timeline Rail */}
            <div
              className="absolute left-4 w-[3000px] top-[26px] h-1 rounded-full pointer-events-none z-0"
              style={{
                background: 'linear-gradient(to right, rgba(56,189,248,0.95), rgba(168,85,247,0.85) 40%, rgba(56,189,248,0.85) 75%, rgba(16,185,129,0.7) 100%)',
                boxShadow: '0 0 16px rgba(56,189,248,0.6)',
              }}
            />

            {milestones.map((m, i) => {
              const cfg = TYPE_CONFIG[m.type] || TYPE_CONFIG.role;
              const Icon = cfg.icon;

              return (
                <div key={m.id} className="relative flex flex-col items-center shrink-0">
                  
                  {/* Timeline Rail Station Node & Year Flag */}
                  <div className="relative flex flex-col items-center mb-3">
                    {/* Glowing Station Node on the line */}
                    <div className="w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_16px_rgba(56,189,248,0.6)] z-20">
                      <div className={`w-3 h-3 rounded-full ${cfg.pinBg} ${m.current ? 'animate-ping' : ''}`} />
                    </div>

                    {/* Timeline Era Badge */}
                    <div className="absolute -top-7 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-cyan-400/50 text-cyan-300 font-sans text-[11px] font-bold shadow-md z-20 flex items-center gap-1">
                      <span>{m.period}</span>
                      {m.current && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />}
                    </div>

                    {/* Vertical Connecting Stem Line (Rail down to Card) */}
                    <div
                      className="w-0.5 h-6 mt-1"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(56,189,248,0.8), rgba(56,189,248,0.2))',
                        boxShadow: '0 0 8px rgba(56,189,248,0.4)',
                      }}
                    />
                  </div>

                  {/* The Timeline Card with Parallax Depth */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className={`w-[320px] sm:w-[370px] lg:w-[390px] glass-panel p-5 sm:p-5.5 border ${cfg.border} shadow-2xl rounded-2xl relative overflow-hidden flex flex-col justify-between group`}
                  >
                    {/* Background ambient glow */}
                    <div className={`absolute top-0 right-0 left-0 h-20 bg-gradient-to-b ${cfg.glow} opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                    {/* Watermark Year Background */}
                    <div className="absolute -bottom-3 -right-2 font-display font-extrabold text-6xl text-slate-800/20 select-none pointer-events-none tracking-tighter">
                      {m.period.slice(0, 4)}
                    </div>

                    <div className="relative z-10">
                      {/* Card Type Badge & Icon Header */}
                      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-700/50">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg ${cfg.bg} border ${cfg.border} flex items-center justify-center shadow-inner`}>
                            <Icon size={16} className={cfg.color} />
                          </div>
                          <span className={`font-sans text-[10px] font-bold px-2 py-0.5 rounded-md border ${cfg.bg} ${cfg.color} ${cfg.border} uppercase`}>
                            {cfg.label}
                          </span>
                        </div>

                        <span className="font-sans text-[10px] text-slate-400 font-semibold">
                          STAGE 0{i + 1}
                        </span>
                      </div>

                      {/* Title & Organisation */}
                      <h3 className="font-display font-bold text-white text-base sm:text-lg group-hover:text-cyan-300 transition-colors leading-snug">
                        {m.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 mb-2.5 text-xs font-sans text-slate-300">
                        <span className="font-semibold text-cyan-400">{m.organisation}</span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                          <MapPin size={11} className="text-cyan-400" />
                          {m.location}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-slate-200 font-sans text-xs leading-relaxed mb-3 line-clamp-3">
                        {m.description}
                      </p>

                      {/* Deliveries Highlights */}
                      {m.highlights && m.highlights.length > 0 && (
                        <div className="space-y-1.5 bg-slate-950/70 border border-slate-800/80 rounded-xl p-3">
                          <p className="font-sans text-[10px] font-bold text-slate-200 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <Sparkles size={11} className="text-cyan-400" /> Key Engineering Deliveries:
                          </p>
                          {m.highlights.slice(0, 3).map((h, j) => (
                            <div key={j} className="flex items-start gap-1.5 text-xs font-sans text-slate-300">
                              <CheckCircle2 size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                              <span className="leading-snug line-clamp-2 text-[11px]">{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="relative z-10 pt-2.5 mt-2.5 border-t border-slate-800 flex items-center justify-between text-[10px] font-sans text-slate-400">
                      <span>Timeline Node #{i + 1}</span>
                      <span className="font-semibold text-cyan-300">{m.period}</span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Footer Guidance */}
        <div className="pt-2 flex items-center justify-between text-xs font-sans text-slate-400 border-t border-slate-800/60">
          <span>Continuous software engineering leadership since 2013</span>
          <span className="text-cyan-300 font-medium flex items-center gap-1">
            <span>Scroll down to continue portfolio</span>
            <ArrowRight size={13} />
          </span>
        </div>

      </div>
    </section>
  );
};

export default InteractiveTimeline;





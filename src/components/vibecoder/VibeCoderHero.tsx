import { Download } from 'lucide-react';
import VibeCoderKeyboard from './VibeCoderKeyboard';
import CinematicCloudParallax from './CinematicCloudParallax';
import { downloadCvPdf } from '../../utils/generateCvPdf';
import type { SystemConfig } from '../../types';

interface VibeCoderHeroProps {
  config: SystemConfig;
}

export default function VibeCoderHero({ config }: VibeCoderHeroProps) {
  return (
    <section id="home" className="relative pt-2 pb-4 sm:pt-4 sm:pb-6 overflow-hidden">
      {/* Playful Neo-Brutalist Grid Background Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: 'radial-gradient(#CFC8BE 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* ── Multi-Depth Stacked Cloud Parallax (Cloud Server & DevOps Metaphor) ── */}
      <CinematicCloudParallax />

      <div className="shell relative z-10 max-w-5xl mx-auto px-3 sm:px-6">
        {/* Main Content Stack */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-1.5 sm:space-y-2.5">
          {/* Main Hero Headline */}
          <h1 className="font-sans text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 leading-[1.15]">
            Hi, I'm{' '}
            <span className="font-['Zentronix','Audiowide','Michroma',sans-serif] tracking-wider text-[#065F46] uppercase inline-block text-[0.86em] sm:text-[0.92em] hover:text-[#047857] transition-colors">
              Bramastyo
            </span>
            .
            <br />
            <span className="text-zinc-800 text-lg sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight block mt-1 sm:mt-2">
              Full-Stack Web, Mobile & Enterprise AI
            </span>
          </h1>

          <p className="max-w-4xl lg:max-w-5xl px-3 sm:px-4 text-xs sm:text-sm md:text-base text-zinc-700 font-medium leading-normal sm:leading-relaxed">
            {config.ownerBio ||
              "Since 2013, I've been dedicated to engineering software that solves real business problems — building scalable web applications across modern Frontend & robust Backend architectures, crafting high-performance mobile apps for distributed remote teams, and deploying enterprise AI systems across 50+ successful production projects."}
          </p>
        </div>

        {/* ── The Star Feature: Interactive Mechanical Keyboard (Grand, Prominent & Centered) ── */}
        <div className="mt-1 sm:mt-3 mb-0 sm:mb-1">
          <VibeCoderKeyboard />
        </div>

        {/* Action Button: Download Resume */}
        <div className="mt-2.5 sm:mt-4 flex items-center justify-center mx-auto w-full">
          <button
            onClick={() => downloadCvPdf()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-zinc-900 bg-[#38BDF8] px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-950 shadow-[0_3px_0_0_#18181B] sm:shadow-[0_4px_0_0_#18181B] hover:translate-y-[-2px] transition-all cursor-pointer active:translate-y-[2px]"
          >
            <Download size={16} />
            <span>Download Resume</span>
          </button>
        </div>
      </div>
    </section>
  );
}

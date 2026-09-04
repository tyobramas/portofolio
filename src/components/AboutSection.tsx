import { CheckCircle2, Award } from 'lucide-react';
import Reveal from './Reveal';
import type { SystemConfig } from '../types';

interface AboutSectionProps {
  config: SystemConfig;
}

const HIGHLIGHTS = [
  'Clean & Efficient Architecture',
  'Modern & Responsive Design',
  'Performance Optimization (<80ms API)',
  'Autonomous AI Workflow Automation',
];

export default function AboutSection({ config }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 sm:py-20 relative">
      <div className="mx-auto max-w-shell px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Narrative, Checkmarks, and Signature */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold-400">
                ABOUT ME
              </span>
            </Reveal>

            <Reveal delay={60}>
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Crafting Digital Experiences That Make{' '}
                <span className="gold-text-gradient">Impact</span>
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="text-ink-300 text-sm sm:text-base leading-relaxed">
                {config.ownerBio ||
                  'I am a passionate Principal Software Engineer with over 13 years of production experience in building scalable web and mobile applications. I love turning complex enterprise logic into beautiful, functional, and high-performance solutions.'}
              </p>
            </Reveal>

            {/* Checklist */}
            <Reveal delay={180}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {HIGHLIGHTS.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-gold-accent shrink-0" />
                    <span className="font-sans text-xs sm:text-sm font-semibold text-ink-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Cursive Signature */}
            <Reveal delay={240}>
              <div className="pt-4 flex items-center gap-4">
                <div className="font-signature text-4xl sm:text-5xl font-bold text-gold-light select-none tracking-wide drop-shadow-[0_2px_10px_rgba(229,169,60,0.35)]">
                  {config.ownerName || 'Tyo Bramas'}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Workstation photo with floating badge */}
          <div className="lg:col-span-6">
            <Reveal delay={100}>
              <div className="relative group">
                {/* Subtle back gold ambient glow */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold-500/20 to-gold-600/10 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Workstation photo container */}
                <div className="relative overflow-hidden rounded-2xl border border-[#262A38] bg-[#12141C] shadow-2xl">
                  <img
                    src="/images/workstation_setup.jpg"
                    alt="Developer Workstation Setup"
                    className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/70 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Gold Badge */}
                  <div className="absolute bottom-5 left-5 inline-flex items-center gap-2.5 rounded-xl border border-gold-500/40 bg-[#0B0C10]/90 backdrop-blur-md px-4 py-2.5 shadow-2xl">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500/20 text-gold-400">
                      <Award className="h-4 w-4 text-gold-400" />
                    </div>
                    <div>
                      <p className="font-sans text-sm font-extrabold text-white leading-none">
                        13+ Years
                      </p>
                      <p className="font-sans text-[0.6875rem] font-semibold text-gold-400 uppercase tracking-wider mt-0.5">
                        Experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}


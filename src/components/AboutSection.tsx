import { lazy, Suspense } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';
import type { SystemConfig } from '../types';

const DioramaRoom3D = lazy(() => import('./DioramaRoom3D'));

const HIGHLIGHTS = [
  'Full-Stack Web Engineering (Since 2013)',
  'Flutter Mobile Engineering (Early Adopter)',
  'Enterprise AI Systems & Autonomous LLMs',
  'Remote Team Leadership & Clean Architecture',
  'Workflow Automation & High-Scale Pipelines',
  'Biometric Presence & Live Anti-Spoofing',
];

interface AboutSectionProps {
  config: SystemConfig;
}

export default function AboutSection({ config }: AboutSectionProps) {
  return (
    <section id="about" className="relative py-12 sm:py-14">
      <div className="shell">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Narrative, Checkmarks, and Signature */}
          <div className="lg:col-span-5 space-y-5">
            <Reveal>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold-400">
                ABOUT ME
              </span>
            </Reveal>

            <Reveal delay={60}>
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                We Build <span className="gold-text-gradient">Solutions</span> That Drive Real Impact
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="max-w-prose text-[15px] leading-7 text-ink-300">
                I began software engineering in 2013 crafting robust web architectures. When Flutter made its initial public debut, I immediately stepped forward as an early adopter — delivering high-performance cross-platform mobile solutions for remote tech firms including PT Passion Abadi, PT 3D, and PT Rekayasa Digital. Today, I architect full-stack platforms and enterprise AI systems with 50+ production deployments, transforming complex business requirements into high-impact digital solutions.
              </p>
            </Reveal>

            {/* Checklist with Tactile Highlights - 2 Columns */}
            <Reveal delay={180}>
              <div className="grid gap-2.5 pt-1 sm:grid-cols-2">
                {HIGHLIGHTS.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-lg border border-[#232736]/70 bg-[#12141C]/60 p-3 transition-all hover:border-gold-500/40 hover:bg-gold-500/5"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-accent" />
                    <span className="font-sans text-[13px] font-semibold leading-snug text-ink-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Cursive Signature & Motto */}
            <Reveal delay={240}>
              <div className="pt-4 flex items-center justify-between border-t border-[#232736]/80">
                <div className="font-signature text-3xl sm:text-4xl font-bold text-gold-light select-none tracking-wide drop-shadow-[0_2px_10px_rgba(229,169,60,0.35)]">
                  {config.ownerName || 'Bramastyo Kusumo'}
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-ink-400">
                  <Sparkles size={14} className="text-gold-accent" />
                  <span>Precision Engineering</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 3D Isometric Diorama in SpotlightCard */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <SpotlightCard
                className="relative p-1.5 overflow-hidden group shadow-2xl"
                spotlightColor="rgba(229, 169, 60, 0.22)"
                borderColor="rgba(245, 200, 105, 0.5)"
              >
                <Suspense fallback={<div className="h-[460px] animate-pulse rounded-xl bg-[#12141c]" />}>
                  <DioramaRoom3D className="h-[400px] w-full sm:h-[470px] lg:h-[540px]" />
                </Suspense>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

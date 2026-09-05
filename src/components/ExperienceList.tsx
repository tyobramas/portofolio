import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';
import type { Milestone } from '../types';

export default function ExperienceList({ milestones }: { milestones: Milestone[] }) {
  return (
    <section id="experience" className="py-16 sm:py-20 relative">
      <div className="mx-auto max-w-shell px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <Reveal>
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold-400">
              CAREER TIMELINE
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Executive Experience & Leadership
            </h2>
          </Reveal>
        </div>

        <div className="space-y-4">
          {milestones.map((m, i) => (
            <Reveal key={m.id} delay={i * 45}>
              <SpotlightCard
                className="p-6 sm:p-7 group hover:border-gold-500/50"
                spotlightColor="rgba(229, 169, 60, 0.14)"
                borderColor="rgba(245, 200, 105, 0.4)"
              >
                <div className="grid gap-4 sm:grid-cols-[170px_1fr] sm:gap-6 items-start">
                  <div>
                    <span className="inline-block tabular font-sans text-xs font-bold text-gold-300 bg-gold-500/10 border border-gold-500/30 px-3 py-1 rounded-md">
                      {m.period}
                    </span>
                    {m.current && (
                      <span className="block mt-2 text-[0.6875rem] font-bold text-emerald-400 tracking-wider">
                        ● CURRENT ROLE
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-sans text-lg font-bold text-white group-hover:text-gold-200 transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-sm font-semibold text-gold-400/90 mt-0.5">
                      {m.organisation} · <span className="text-ink-400 font-normal">{m.location}</span>
                    </p>

                    {m.description && (
                      <p className="mt-3 text-sm text-ink-300 leading-relaxed">
                        {m.description}
                      </p>
                    )}

                    {m.highlights && m.highlights.length > 0 && (
                      <ul className="mt-3.5 space-y-2 border-t border-[#232736] pt-3">
                        {m.highlights.map((h) => (
                          <li key={h} className="text-xs sm:text-sm text-ink-300 flex items-start gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0 mt-2" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

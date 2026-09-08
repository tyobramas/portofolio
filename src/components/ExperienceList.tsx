import { GraduationCap, MapPin, Globe } from 'lucide-react';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';
import type { Milestone } from '../types';

export default function ExperienceList({ milestones }: { milestones: Milestone[] }) {
  return (
    <section id="experience" className="relative py-14 sm:py-16">
      <div className="shell">
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-10">
          <Reveal>
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold-400">
              CAREER TIMELINE
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Career Journey & Experience
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-sm sm:text-[15px] text-ink-300 leading-relaxed max-w-xl mx-auto">
              From web engineering in 2013 to early Flutter adoption at launch, remote enterprise delivery across multi-company contracts, and principal AI systems architecture.
            </p>
          </Reveal>
        </div>

        <div className="relative space-y-5">
          {/* Subtle vertical spine track on desktop */}
          <div className="hidden lg:block absolute left-[195px] top-6 bottom-6 w-px bg-gradient-to-b from-gold-500/40 via-gold-500/15 to-transparent pointer-events-none" />

          {milestones.map((m, i) => {
            const isEducation = m.type === 'education';
            const isRemote = m.location.toLowerCase().includes('remote');

            return (
              <Reveal key={m.id} delay={i * 40}>
                <SpotlightCard
                  className="p-6 sm:p-7 group hover:border-gold-500/50 transition-all duration-300"
                  spotlightColor="rgba(229, 169, 60, 0.14)"
                  borderColor="rgba(245, 200, 105, 0.4)"
                >
                  <div className="grid gap-4 lg:grid-cols-[180px_1fr] lg:gap-8 items-start">
                    {/* Left Column: Timeline Metadata */}
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[9px] font-semibold text-gold-500/70 uppercase tracking-widest">
                          NODE.{String(i + 1).padStart(2, '0')}
                        </span>
                        {m.current && (
                          <span className="flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            ACTIVE
                          </span>
                        )}
                      </div>

                      <div className="inline-block tabular font-mono text-xs font-bold text-gold-300 bg-gold-500/10 border border-gold-500/30 px-3 py-1.5 rounded-md shadow-[0_2px_8px_rgba(229,169,60,0.1)]">
                        {m.period}
                      </div>

                      <div className="mt-2.5 flex items-center gap-1.5 text-xs text-ink-400">
                        {isRemote ? (
                          <>
                            <Globe size={13} className="text-gold-400/80 shrink-0" />
                            <span className="font-medium text-ink-300">Remote</span>
                          </>
                        ) : isEducation ? (
                          <>
                            <GraduationCap size={13} className="text-gold-400/80 shrink-0" />
                            <span>Academic</span>
                          </>
                        ) : (
                          <>
                            <MapPin size={13} className="text-gold-400/80 shrink-0" />
                            <span className="truncate">{m.location}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Role Details */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-1">
                        <h3 className="font-sans text-lg sm:text-xl font-bold text-white group-hover:text-gold-200 transition-colors">
                          {m.title}
                        </h3>
                        {m.badge && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-gold-300 bg-gold-500/10 border border-gold-500/25 px-2.5 py-0.5 rounded-full">
                            {m.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm font-semibold text-gold-400/90">
                        <span>{m.organisation}</span>
                        <span className="text-ink-500">·</span>
                        <span className="text-ink-400 font-normal text-xs sm:text-sm">{m.location}</span>
                      </div>

                      {m.description && (
                        <p className="mt-3 text-sm text-ink-300 leading-relaxed max-w-prose">
                          {m.description}
                        </p>
                      )}

                      {m.highlights && m.highlights.length > 0 && (
                        <ul className="mt-3.5 space-y-2 border-t border-[#232736] pt-3">
                          {m.highlights.map((h) => (
                            <li key={h} className="text-xs sm:text-sm text-ink-300 flex items-start gap-2.5">
                              <span className="font-mono text-[10px] text-gold-400 font-bold shrink-0 mt-0.5">❯</span>
                              <span className="leading-snug">{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {m.tags && m.tags.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-[#232736]/60 flex flex-wrap gap-1.5">
                          {m.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-sans font-medium text-ink-300 bg-[#141620] border border-[#232736] px-2.5 py-0.5 rounded transition-all hover:border-gold-500/40 hover:text-gold-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

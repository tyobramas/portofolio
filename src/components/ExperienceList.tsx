import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import type { Milestone } from '../types';

export default function ExperienceList({ milestones }: { milestones: Milestone[] }) {
  return (
    <section id="experience" className="pb-section">
      <SectionHeading index="02" title="Pengalaman" note="Perjalanan karier & kontribusi" />
      <div className="panel">
        {milestones.map((m, i) => (
          <Reveal key={m.id} delay={i * 45}>
            <div className="row grid gap-1.5 px-5 py-4 sm:grid-cols-[124px_1fr] sm:gap-6">
              <p className="tabular text-meta text-ink-500 sm:pt-0.5">{m.period}</p>
              <div>
                <h3 className="font-display text-h3 text-ink-900">{m.title}</h3>
                <p className="text-meta text-brass-600">
                  {m.organisation} · {m.location}
                </p>
                {m.description && (
                  <p className="mt-1.5 max-w-prose text-body text-ink-700">{m.description}</p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

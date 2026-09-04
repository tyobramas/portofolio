import { ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import type { Project } from '../types';

export default function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="pb-section">
      <SectionHeading index="03" title="Proyek Pilihan" note={`${projects.length} studi kasus`} />

      <div className="panel">
        {projects.map((p, i) => {
          const projectLink = p.link || p.links?.live;
          const techList = p.tech || p.techStack || [];

          return (
            <Reveal key={p.id} delay={i * 50}>
              <article className="row grid gap-4 p-5 sm:grid-cols-[132px_1fr]">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-[2px] border border-rule object-cover"
                  />
                ) : (
                  <div className="aspect-[4/3] w-full rounded-[2px] border border-rule bg-canvas-sunken flex items-center justify-center text-brass-500/60 font-mono text-xs">
                    [{p.category}]
                  </div>
                )}

                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-display text-h3 text-ink-900">{p.title}</h3>
                    <span className="tabular text-meta text-ink-500">{p.year}</span>
                    {projectLink && projectLink !== '#' && (
                      <a
                        href={projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline ml-auto inline-flex items-center gap-1 text-meta"
                      >
                        Lihat <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>

                  <p className="mt-1.5 max-w-prose text-body text-ink-700">{p.description}</p>

                  {/* Hasil terukur — bagian yang paling dicari HRD */}
                  {p.impact && (
                    <p className="mt-2 border-l-2 border-brass-300 pl-3 text-meta font-medium text-ink-800">
                      {p.impact}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {techList.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

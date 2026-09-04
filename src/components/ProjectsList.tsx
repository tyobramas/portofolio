import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import type { Project } from '../types';

type CategoryFilter = 'all' | 'ai' | 'mobile' | 'saas';

const FILTERS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'ai', label: 'AI & Automation' },
  { id: 'saas', label: 'Enterprise Web' },
];

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ai')
      return (
        p.category === 'api' ||
        p.techStack?.some(
          (t) => t.toLowerCase().includes('ai') || t.toLowerCase().includes('langchain')
        )
      );
    if (activeFilter === 'mobile') return p.category === 'mobile';
    if (activeFilter === 'saas') return p.category === 'saas';
    return true;
  });

  return (
    <section id="projects" className="py-16 sm:py-20 relative">
      <div className="mx-auto max-w-shell px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <Reveal>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold-400">
                FEATURED PROJECTS
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                My Recent Work
              </h2>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="flex items-center gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {FILTERS.map((f) => {
                  const isActive = activeFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setActiveFilter(f.id)}
                      className={[
                        'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer',
                        isActive
                          ? 'bg-gold-500 text-canvas font-bold shadow-gold-sm'
                          : 'bg-[#141722] text-ink-300 hover:text-white border border-[#232736]',
                      ].join(' ')}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        {/* 3-Column Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((p, i) => {
            const projectLink = p.link || p.links?.live || '#';
            return (
              <Reveal key={p.id} delay={i * 60}>
                <article className="card-dark group overflow-hidden flex flex-col justify-between h-full hover:border-gold-500/50 transition-all duration-300">
                  <div>
                    {/* Project Image Preview */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0C10] border-b border-[#232736]">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.title}
                          loading="lazy"
                          className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gold-400 font-mono text-xs">
                          {p.title}
                        </div>
                      )}

                      {/* Category Badge overlay */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0B0C10]/80 backdrop-blur-md border border-[#262A38] text-[0.6875rem] font-semibold text-gold-400 uppercase tracking-wider">
                        {p.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-sans text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                            {p.title}
                          </h3>
                          <p className="font-sans text-xs font-medium text-ink-400 mt-0.5">
                            {p.techStack?.slice(0, 3).join(' · ')}
                          </p>
                        </div>

                        {projectLink && (
                          <a
                            href={projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${p.title}`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#262A38] bg-[#1A1D29] text-ink-300 group-hover:border-gold-400 group-hover:bg-gold-500 group-hover:text-canvas transition-all duration-200 shrink-0"
                          >
                            <ArrowUpRight size={16} />
                          </a>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-ink-300 line-clamp-2 leading-relaxed pt-1">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}


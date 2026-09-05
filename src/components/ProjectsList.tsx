import { useState } from 'react';
import { ArrowUpRight, Eye, Layers } from 'lucide-react';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';
import ProjectModal from './ProjectModal';
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
                Engineering Showcase
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
                        'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer',
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

        {/* 3-Column Projects Grid with Interactive Dossier Modals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((p, i) => {
            const projectLink = p.link || p.links?.live || '#';
            return (
              <Reveal key={p.id} delay={i * 60}>
                <SpotlightCard
                  onClick={() => setSelectedProject(p)}
                  className="cursor-pointer group flex flex-col justify-between h-full hover:border-gold-500/60 transition-all duration-300"
                  spotlightColor="rgba(229, 169, 60, 0.16)"
                  borderColor="rgba(245, 200, 105, 0.5)"
                >
                  <div>
                    {/* Project Image Preview with Overlay on Hover */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0C10] border-b border-[#232736]">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.title}
                          loading="lazy"
                          className="h-full w-full object-cover object-top group-hover:scale-106 transition-transform duration-700"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gold-400 font-mono text-xs">
                          {p.title}
                        </div>
                      )}

                      {/* Interactive Hover Backdrop Hint */}
                      <div className="absolute inset-0 bg-[#0B0C10]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/80 bg-[#0B0C10]/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-300 shadow-xl">
                          <Eye size={14} /> Open Case Study
                        </span>
                      </div>

                      {/* Category Badge overlay */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0B0C10]/85 backdrop-blur-md border border-[#262A38] text-[0.6875rem] font-bold text-gold-400 uppercase tracking-wider shadow-sm">
                        {p.category}
                      </div>

                      {/* Year badge */}
                      {p.year && (
                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#0B0C10]/80 backdrop-blur-md border border-[#262A38] text-[0.625rem] font-semibold text-ink-300">
                          {p.year}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-sans text-lg font-bold text-white group-hover:text-gold-300 transition-colors leading-snug">
                            {p.title}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1 text-xs text-gold-400 font-medium">
                            <Layers size={13} className="text-gold-accent" />
                            <span>{p.techStack?.slice(0, 3).join(' · ')}</span>
                          </div>
                        </div>

                        {projectLink && projectLink !== '#' && (
                          <a
                            href={projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title="Direct link"
                            aria-label={`View ${p.title}`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#262A38] bg-[#1A1D29] text-ink-300 group-hover:border-gold-400 group-hover:bg-gold-500 group-hover:text-canvas transition-all duration-200 shrink-0"
                          >
                            <ArrowUpRight size={16} />
                          </a>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-ink-300 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>

                      {/* Key Result / Metric Pill */}
                      {p.metrics && p.metrics[0] && (
                        <div className="pt-2 border-t border-[#232736]/70 flex items-center justify-between text-xs">
                          <span className="text-ink-400 text-[0.6875rem] uppercase tracking-wider">
                            {p.metrics[0].label}
                          </span>
                          <span className="font-bold text-gold-light text-xs">
                            {p.metrics[0].value}
                          </span>
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

      {/* Case Study Dossier Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

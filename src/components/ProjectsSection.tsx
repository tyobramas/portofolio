import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, BarChart3, Layers } from 'lucide-react';
import StatusBadge from './StatusBadge';
import Modal from './Modal';
import type { Project, ProjectFilter } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
}

const FILTERS: { value: ProjectFilter; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'saas', label: 'SaaS' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'api', label: 'AI & Data / API' },
  { value: 'web', label: 'Web' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.25, delay: i * 0.03 },
  }),
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" aria-label="Project Case Studies" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-mono text-cyan-400 text-xs tracking-widest mb-2">$ ls -la ./projects/</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-100">Featured Case Studies</h2>
          <p className="text-slate-300 text-sm mt-2 max-w-lg mx-auto">
            Production systems spanning AI SaaS platforms, autonomous agents, mobile apps & enterprise engines.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-8" role="group" aria-label="Filter projects by category">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              aria-pressed={activeFilter === f.value}
              className={[
                'px-3.5 py-1.5 font-mono text-xs tracking-wide rounded-lg border transition-all duration-150',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400',
                activeFilter === f.value
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.2)] font-medium'
                  : 'bg-slate-900/50 border-slate-700/60 text-slate-300 hover:border-slate-500 hover:text-white',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="project-card glass-panel rounded-xl flex flex-col cursor-pointer group hover:border-cyan-400/50"
                onClick={() => setSelected(project)}
                role="button"
                tabIndex={0}
                aria-label={`View case study: ${project.title}`}
                onKeyDown={e => e.key === 'Enter' && setSelected(project)}
              >
                {/* Colour accent bar */}
                <div
                  className="h-0.5 w-full rounded-t-xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                />

                <div className="p-5 flex flex-col flex-1">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-300 tracking-wider uppercase border border-slate-700/60 bg-slate-800/80 px-2 py-0.5 rounded">
                        {project.category}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">{project.year}</span>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>

                  {/* Title & desc */}
                  <h3 className="font-display font-semibold text-slate-100 text-lg leading-snug mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed flex-1">{project.description}</p>

                  {/* Metrics */}
                  {project.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-3.5 pt-3.5 border-t border-slate-700/50">
                      {project.metrics.slice(0, 3).map((m, mi) => (
                        <div key={mi} className="text-center">
                          <p className="font-mono text-cyan-300 text-sm font-semibold">{m.value}</p>
                          <p className="font-mono text-slate-400 text-[10px] mt-0.5">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1 mt-3.5">
                    {project.techStack.slice(0, 4).map(tech => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] text-slate-300 bg-slate-800/80 border border-slate-700/50 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="font-mono text-[10px] text-slate-400 px-1">+{project.techStack.length - 4}</span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-4 pt-3 border-t border-slate-700/40">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.title} live site`}
                        onClick={e => e.stopPropagation()}
                        className="flex items-center gap-1 font-mono text-[11px] text-cyan-300 hover:text-cyan-200 transition-colors"
                      >
                        <ExternalLink size={11} /> Live
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub repository`}
                        onClick={e => e.stopPropagation()}
                        className="flex items-center gap-1 font-mono text-[11px] text-slate-300 hover:text-white transition-colors"
                      >
                        <Github size={11} /> Source
                      </a>
                    )}
                    <span className="ml-auto font-mono text-[11px] text-cyan-400/80 group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                      <BarChart3 size={11} /> Case Study
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-slate-400 font-mono text-sm py-16">
            No projects in this category yet.
          </p>
        )}
      </div>

      {/* Case Study Modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ''}
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 flex-wrap">
              <StatusBadge status={selected.status} />
              <span className="font-mono text-[10px] text-slate-300 tracking-wider uppercase border border-slate-700/60 bg-slate-800/80 px-2 py-0.5 rounded">
                {selected.category}
              </span>
              <span className="font-mono text-[10px] text-slate-400">{selected.year}</span>
            </div>

            <p className="text-slate-200 text-sm leading-relaxed">{selected.longDescription}</p>

            {/* Metrics */}
            {selected.metrics.length > 0 && (
              <div>
                <p className="font-mono text-xs text-cyan-400 tracking-widest mb-2.5 flex items-center gap-2">
                  <BarChart3 size={12} /> KEY METRICS
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  {selected.metrics.map((m, i) => (
                    <div key={i} className="bg-slate-900/60 border border-slate-700/60 rounded-lg p-2.5 text-center">
                      <p className="font-mono text-cyan-300 font-semibold text-base">{m.value}</p>
                      <p className="font-mono text-slate-400 text-[10px] mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech stack */}
            <div>
              <p className="font-mono text-xs text-cyan-400 tracking-widest mb-2.5 flex items-center gap-2">
                <Layers size={12} /> TECH STACK
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selected.techStack.map(tech => (
                  <span key={tech} className="font-mono text-xs text-slate-200 bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-3 flex-wrap pt-2 border-t border-slate-700/40">
              {selected.links.live && (
                <a
                  href={selected.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-sm text-cyan-300 hover:text-cyan-200 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 rounded"
                >
                  <ExternalLink size={14} /> Visit Live Site
                </a>
              )}
              {selected.links.github && (
                <a
                  href={selected.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-sm text-slate-300 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 rounded"
                >
                  <Github size={14} /> View Source
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default ProjectsSection;

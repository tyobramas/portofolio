import { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Cpu, TrendingUp, Layers } from 'lucide-react';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const projectUrl = project.link || project.links?.live || '#';
  const isGithub = projectUrl.includes('github.com');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Deep Obsidian Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      />

      {/* Modal Card Window */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gold-500/40 bg-[#0E1017] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(229,169,60,0.15)] transition-all z-10 custom-scrollbar">
        {/* Top Gold Hairline Light */}
        <div className="sticky top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5C869] to-transparent z-30" />

        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#232736] bg-[#0E1017]/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="rounded-md border border-gold-500/30 bg-gold-500/10 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-widest text-gold-accent">
              {project.category}
            </span>
            <span className="text-xs font-medium text-ink-400">
              {project.year ? `Year ${project.year}` : 'Production Grade'}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#232736] bg-[#141722] text-ink-300 hover:border-gold-500 hover:text-white hover:scale-105 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Project Title & Short Summary */}
          <div>
            <h2 id="modal-title" className="font-sans text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink-300 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Project Preview Image */}
          {project.image && (
            <div className="relative overflow-hidden rounded-xl border border-[#232736] bg-[#08090D] group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full max-h-[360px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-transparent to-transparent opacity-40 pointer-events-none" />
            </div>
          )}

          {/* Measurable ROI & Impact Tiles */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-light">
                <TrendingUp size={15} className="text-gold-accent" /> Measurable Impact & Key Metrics
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-gold-500/25 bg-[#141722] p-4 text-center hover:border-gold-400/50 transition-colors"
                  >
                    <span className="block font-sans text-lg sm:text-xl font-extrabold text-white">
                      {m.value}
                    </span>
                    <span className="mt-1 block font-sans text-[0.6875rem] font-semibold uppercase tracking-wider text-gold-300">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Impact Statement Highlight */}
          {project.impact && (
            <div className="flex items-start gap-3.5 rounded-xl border border-[#2A2F40] bg-[#121520] p-4 text-sm text-ink-200">
              <CheckCircle2 className="h-5 w-5 text-gold-accent shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Production Result: </span>
                <span>{project.impact}</span>
              </div>
            </div>
          )}

          {/* Engineering Architecture Breakdown */}
          <div className="space-y-3 rounded-xl border border-[#232736] bg-[#12141C] p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-light">
              <Cpu size={15} className="text-gold-accent" /> Architecture Highlights
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-ink-300">
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0 mt-2" />
                <span>
                  <strong className="text-ink-100">Clean & Modular Architecture:</strong> High separation of concerns with domain layers, dependency injection, and deterministic state management.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0 mt-2" />
                <span>
                  <strong className="text-ink-100">Fault-Tolerant Reliability:</strong> Resilient offline caching, token refresh mechanics, and sub-100ms response targets.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0 mt-2" />
                <span>
                  <strong className="text-ink-100">Security & Scalability:</strong> Biometric authentication, encrypted storage, and automated deployment pipelines.
                </span>
              </li>
            </ul>
          </div>

          {/* Full Tech Stack Badges */}
          {project.techStack && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-300">
                <Layers size={14} className="text-gold-accent" /> Technologies & Frameworks
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-[#2A2F42] bg-[#161926] px-3 py-1 text-xs font-medium text-ink-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#232736]">
            <button
              onClick={onClose}
              className="rounded-lg border border-[#262A38] bg-[#141722] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ink-300 hover:text-white transition-colors"
            >
              Close Dossier
            </button>

            {projectUrl && projectUrl !== '#' && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-canvas shadow-gold-glow"
              >
                {isGithub ? (
                  <>
                    <Github size={15} /> View Source / Repo
                  </>
                ) : (
                  <>
                    <ExternalLink size={15} /> Visit Platform
                  </>
                )}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

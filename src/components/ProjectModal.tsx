import { useEffect, useState, useRef, useCallback } from 'react';
import { X, CheckCircle2, Cpu, TrendingUp, Layers, ShieldCheck, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Collect all valid images: prefer project.images, fallback to project.image
  const images = (project?.images && project.images.length > 0)
    ? project.images
    : (project?.image ? [project.image] : []);

  useEffect(() => {
    setCurrentSlide(0);
  }, [project?.id]);

  const goToPrev = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToNext = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, goToPrev, goToNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) goToNext();
      else goToPrev();
    }
    touchStartX.current = null;
  };

  if (!project) return null;

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
              {project.status === 'live'
                ? '● In Production'
                : project.status === 'private'
                ? 'Private Enterprise'
                : project.status === 'wip'
                ? 'In Development'
                : project.status === 'completed'
                ? 'Completed Project'
                : 'Case Study'}
            </span>
            {project.year && (
              <span className="text-xs font-mono text-ink-500 border-l border-[#262A38] pl-2.5">
                {project.year}
              </span>
            )}
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

          {/* Project Preview Image / Interactive Carousel */}
          {images.length > 0 && (
            <div className="space-y-3">
              <div
                className="relative overflow-hidden rounded-xl border border-[#232736] bg-[#08090D] group select-none aspect-video max-h-[380px] flex items-center justify-center"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  key={currentSlide}
                  src={images[currentSlide]}
                  alt={`${project.title} screenshot ${currentSlide + 1}`}
                  className="w-full h-full object-contain sm:object-cover object-top transition-opacity duration-300 animate-fadeIn"
                  loading="eager"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017]/80 via-transparent to-transparent pointer-events-none" />

                {/* Left Navigation Arrow */}
                {images.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrev();
                    }}
                    aria-label="Previous slide"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md shadow-lg transition-all hover:border-gold-400 hover:bg-black/90 hover:scale-110 active:scale-95 cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}

                {/* Right Navigation Arrow */}
                {images.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    aria-label="Next slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md shadow-lg transition-all hover:border-gold-400 hover:bg-black/90 hover:scale-110 active:scale-95 cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <ChevronRight size={20} />
                  </button>
                )}

                {/* Slide Counter Badge */}
                {images.length > 1 && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/75 px-2.5 py-1 text-[11px] font-mono font-semibold text-white backdrop-blur-md shadow-md">
                    <ImageIcon size={12} className="text-gold-accent" />
                    <span>
                      {currentSlide + 1} / {images.length}
                    </span>
                  </div>
                )}

                {/* Slide Caption Banner */}
                {project.imageCaptions && project.imageCaptions[currentSlide] && (
                  <div className="absolute bottom-3 left-3 right-3 z-10 rounded-lg border border-white/10 bg-black/80 px-3.5 py-2 text-xs font-medium text-ink-200 backdrop-blur-md shadow-md line-clamp-1">
                    <span className="text-gold-accent font-semibold mr-1.5">Slide {currentSlide + 1}:</span>
                    {project.imageCaptions[currentSlide]}
                  </div>
                )}
              </div>

              {/* Indicator Dots & Thumbnails for Multi-Image Projects */}
              {images.length > 1 && (
                <div className="space-y-2">
                  {/* Thumbnails Row */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 custom-scrollbar">
                    {images.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`relative h-14 sm:h-16 aspect-video shrink-0 overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${
                          idx === currentSlide
                            ? 'border-gold-accent ring-2 ring-gold-500/30 scale-[1.02] shadow-[0_0_12px_rgba(229,169,60,0.35)]'
                            : 'border-[#262A38] opacity-50 hover:opacity-100 hover:border-gold-500/50'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          className="h-full w-full object-cover object-top"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Indicator Dots */}
                  <div className="flex items-center justify-center gap-1.5 pt-1">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Slide ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          idx === currentSlide
                            ? 'w-6 bg-gold-accent shadow-[0_0_8px_rgba(229,169,60,0.6)]'
                            : 'w-2 bg-white/20 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
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
                <span className="font-bold text-white">
                  {project.status === 'live' ? 'Production Result: ' : 'Project Impact: '}
                </span>
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
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#232736]">
            <div className="flex items-center gap-2 text-xs text-ink-400">
              <ShieldCheck size={14} className="text-gold-400" />
              <span>
                {project.status === 'live'
                  ? 'Active Production Deployment'
                  : project.status === 'private'
                  ? 'Private Enterprise Case Study'
                  : project.status === 'wip'
                  ? 'Active Development Initiative'
                  : project.status === 'completed'
                  ? 'Completed Project Record'
                  : 'Architecture & Case Study Dossier'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="btn-gold rounded-lg px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-canvas shadow-gold-glow cursor-pointer"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

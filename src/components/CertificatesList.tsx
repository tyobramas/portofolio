import { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  Copy,
  Check,
  Award,
  Eye,
  X,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';
import type { Certificate } from '../types';
import { defaultCertificates } from '../data';

export default function CertificatesList({ items = defaultCertificates }: { items?: Certificate[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeModalCert, setActiveModalCert] = useState<Certificate | null>(null);

  // Filter out any deprecated academic/BSI entries to guarantee clean industry credentials
  const validItems = items.filter(
    (c) =>
      c.id !== 'cert-005' &&
      !c.issuer.includes('Bina Sarana Informatika') &&
      !c.title.includes('Informatics Engineering')
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalCert(null);
    };

    if (activeModalCert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalCert]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <section id="certificates" className="relative py-8 sm:py-12">
      <div className="shell">
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-3">
          <div className="space-y-1">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-widest text-gold-400">
                <Award size={12} className="text-gold-accent" />
                <span>ACCREDITED CREDENTIALS</span>
              </div>
            </Reveal>
            <Reveal delay={40}>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Industry Certifications
              </h2>
            </Reveal>
            <Reveal delay={70}>
              <p className="text-xs sm:text-sm text-ink-300 max-w-xl">
                Officially credentialed in Large Language Models, Autonomous Agentic Systems, and Full-Stack AI API integrations.
              </p>
            </Reveal>
          </div>

          <Reveal delay={90}>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-400 border border-[#232736] bg-[#0E1017] px-3 py-1 rounded-lg shrink-0 self-start sm:self-auto">
              <Sparkles size={12} className="text-gold-accent" />
              <span className="text-white font-semibold">{validItems.length}</span> Credentials
            </div>
          </Reveal>
        </div>

        {/* 4-Column Balanced & High-Density Card Grid: Zero Dead Space */}
        <div className="grid gap-3 sm:gap-3.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {validItems.map((cert, i) => {
            const isCopied = copiedId === cert.id;

            return (
              <Reveal key={cert.id} delay={i * 40}>
                <SpotlightCard
                  className="p-3 flex flex-col justify-between group hover:border-gold-500/45 transition-all duration-300 bg-[#0C0E14] border-[#202433] rounded-xl h-full"
                  spotlightColor="rgba(229, 169, 60, 0.14)"
                  borderColor="rgba(245, 200, 105, 0.35)"
                >
                  <div>
                    {/* Full-Width Thumbnail Display Case */}
                    {cert.image && (
                      <div
                        onClick={() => setActiveModalCert(cert)}
                        className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-[#262A38] bg-[#07090E] mb-2.5 cursor-pointer group/thumb shadow-sm"
                        title="Click to inspect certificate in high-res"
                      >
                        <img
                          src={cert.image}
                          alt={cert.title}
                          loading="lazy"
                          className="h-full w-full object-cover object-center group-hover/thumb:scale-106 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/15 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover/thumb:opacity-100 transition-opacity inline-flex items-center gap-1 rounded-full bg-[#0E1017]/95 px-2 py-0.5 text-[0.625rem] font-bold text-gold-300 shadow">
                            <Eye size={10} /> Inspect
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Header: Issuer & Date */}
                    <div className="flex items-center justify-between gap-1 text-[0.625rem] font-mono leading-tight">
                      <span className="text-gold-400 font-semibold uppercase tracking-wider truncate">
                        {cert.issuer}
                      </span>
                      <span className="text-ink-400 shrink-0">
                        {cert.issueDate}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => setActiveModalCert(cert)}
                      className="font-sans text-xs sm:text-[13px] font-bold text-white leading-snug line-clamp-2 group-hover:text-gold-200 transition-colors cursor-pointer my-1.5"
                      title={cert.title}
                    >
                      {cert.title}
                    </h3>

                    {/* Compact Skill Tags */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1 mb-2">
                        {cert.skills.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="rounded bg-[#121520] border border-[#202534] px-1.5 py-0.5 text-[0.5625rem] font-medium text-ink-300 leading-none"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Dense Footer Bar: Credential ID chip & External Link */}
                  <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-[#1C202C] text-[0.625rem] font-mono">
                    {cert.credentialId ? (
                      <div className="flex items-center gap-1 text-ink-300 bg-[#121520] border border-[#232736] px-1.5 py-0.5 rounded truncate max-w-[140px]">
                        <span className="text-gold-500 font-bold shrink-0">ID:</span>
                        <span className="truncate text-ink-200">{cert.credentialId}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(cert.id, cert.credentialId!);
                          }}
                          title="Copy Credential ID"
                          className="hover:text-gold-300 text-ink-400 transition-colors cursor-pointer shrink-0 ml-0.5"
                        >
                          {isCopied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                        </button>
                      </div>
                    ) : (
                      <div />
                    )}

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-ink-300 hover:text-gold-300 inline-flex items-center gap-0.5 shrink-0 transition-colors ml-auto"
                      >
                        <span>{cert.credentialUrl.includes('credly') ? 'Credly' : 'Official'}</span>
                        <ArrowUpRight size={10} />
                      </a>
                    )}
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* High-Resolution Certificate Lightbox Modal */}
      {activeModalCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Deep Backdrop */}
          <div
            onClick={() => setActiveModalCert(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl border border-gold-500/50 bg-[#0C0E14] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(229,169,60,0.18)] z-10 custom-scrollbar">
            {/* Top Gold Accent Border */}
            <div className="sticky top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5C869] to-transparent z-30" />

            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#232736] bg-[#0C0E14]/95 px-5 py-3.5 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <span className="rounded-md border border-gold-500/30 bg-gold-500/10 px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-widest text-gold-accent">
                  {activeModalCert.issuer}
                </span>
                <span className="text-xs font-mono text-ink-300">
                  {activeModalCert.issueDate}
                </span>
              </div>

              <button
                onClick={() => setActiveModalCert(null)}
                aria-label="Close certificate preview"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#232736] bg-[#141722] text-ink-300 hover:border-gold-500 hover:text-white hover:scale-105 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-4">
              {/* Full Certificate Image */}
              {activeModalCert.image && (
                <div className="relative overflow-hidden rounded-xl border border-[#2A2F40] bg-[#050608] shadow-2xl">
                  <img
                    src={activeModalCert.image}
                    alt={activeModalCert.title}
                    className="w-full max-h-[520px] object-contain mx-auto"
                  />
                </div>
              )}

              {/* Certificate Details */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-sans text-lg sm:text-xl font-extrabold text-white">
                    {activeModalCert.title}
                  </h3>
                  {activeModalCert.description && (
                    <p className="mt-1.5 text-xs sm:text-sm text-ink-200 leading-relaxed">
                      {activeModalCert.description}
                    </p>
                  )}
                </div>

                {/* Metadata Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="rounded-lg border border-[#232736] bg-[#121520] p-2.5">
                    <span className="text-[0.625rem] font-mono uppercase text-gold-400 block">Issuing Body</span>
                    <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">{activeModalCert.issuer}</span>
                  </div>

                  <div className="rounded-lg border border-[#232736] bg-[#121520] p-2.5">
                    <span className="text-[0.625rem] font-mono uppercase text-gold-400 block">Completion Date</span>
                    <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">{activeModalCert.issueDate}</span>
                  </div>

                  <div className="rounded-lg border border-[#232736] bg-[#121520] p-2.5">
                    <span className="text-[0.625rem] font-mono uppercase text-gold-400 block">Duration / Hours</span>
                    <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">{activeModalCert.hours || 'Accredited Curriculum'}</span>
                  </div>
                </div>

                {/* Credential ID */}
                {activeModalCert.credentialId && (
                  <div className="flex items-center justify-between rounded-lg border border-gold-500/30 bg-[#0A0C12] p-3 text-xs font-mono">
                    <div>
                      <span className="text-[0.625rem] text-gold-400 font-bold uppercase tracking-wider block">
                        CREDENTIAL RECORD ID
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white block mt-0.5 select-all">
                        {activeModalCert.credentialId}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(activeModalCert.id, activeModalCert.credentialId!)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-[#2B3144] bg-[#161924] text-xs text-ink-200 hover:text-gold-300 hover:border-gold-500/50 transition-colors cursor-pointer"
                    >
                      {copiedId === activeModalCert.id ? (
                        <>
                          <Check size={13} className="text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy ID</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#232736]">
                <button
                  onClick={() => setActiveModalCert(null)}
                  className="rounded-lg border border-[#262A38] bg-[#141722] px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink-300 hover:text-white transition-colors cursor-pointer"
                >
                  Close Preview
                </button>

                <div className="flex items-center gap-2">
                  {activeModalCert.image && (
                    <a
                      href={activeModalCert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#2B3144] bg-[#161924] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-ink-200 hover:text-gold-200 hover:border-gold-400/50 transition-all"
                    >
                      <ExternalLink size={13} /> Open Image
                    </a>
                  )}

                  {activeModalCert.credentialUrl && (
                    <a
                      href={activeModalCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider text-canvas shadow-gold-glow"
                    >
                      <Sparkles size={13} />
                      <span>{activeModalCert.credentialUrl.includes('credly') ? 'Credly Badge' : 'Official Portal'}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

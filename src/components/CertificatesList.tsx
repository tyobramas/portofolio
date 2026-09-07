import { useState } from 'react';
import { ArrowUpRight, Copy, Check, Award, ShieldCheck, Cpu } from 'lucide-react';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';
import type { Certificate } from '../types';
import { defaultCertificates } from '../data';

type CertFilter = 'all' | 'ai' | 'mobile' | 'backend' | 'academic';

const FILTERS: { id: CertFilter; label: string }[] = [
  { id: 'all', label: 'All Credentials' },
  { id: 'ai', label: 'AI & Multi-Agent' },
  { id: 'mobile', label: 'Mobile Engineering' },
  { id: 'backend', label: 'Backend & Cloud' },
  { id: 'academic', label: 'Academic Degree' },
];

export default function CertificatesList({ items = defaultCertificates }: { items?: Certificate[] }) {
  const [activeFilter, setActiveFilter] = useState<CertFilter>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const filteredItems = items.filter((c) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ai') return c.category === 'ai';
    if (activeFilter === 'mobile') return c.category === 'mobile';
    if (activeFilter === 'backend') return c.category === 'backend' || c.category === 'cloud';
    if (activeFilter === 'academic') return c.category === 'academic';
    return true;
  });

  return (
    <section id="certificates" className="py-16 sm:py-20 relative">
      <div className="mx-auto max-w-shell px-6 lg:px-10">
        {/* Section Header with Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <Reveal>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold-400">
                CERTIFICATIONS & ACCREDITATIONS
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Verified Industry Credentials
              </h2>
            </Reveal>
          </div>

          <Reveal delay={120}>
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
          </Reveal>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredItems.map((cert, i) => {
            const isCopied = copiedId === cert.id;

            return (
              <Reveal key={cert.id} delay={i * 50}>
                <SpotlightCard
                  className="p-6 sm:p-7 flex flex-col justify-between h-full group"
                  spotlightColor="rgba(229, 169, 60, 0.16)"
                  borderColor="rgba(245, 200, 105, 0.45)"
                >
                  <div>
                    {/* Top Metadata Row: Issuer & Cryptographic Verification Chip */}
                    <div className="flex items-center justify-between gap-2 pb-3.5 mb-4 border-b border-[#232736]">
                      <div className="flex items-center gap-2 text-xs font-mono text-gold-400 font-semibold uppercase tracking-wider">
                        <Award size={15} className="text-gold-accent shrink-0" />
                        <span className="truncate">{cert.issuer}</span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-[0.6875rem] font-sans font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/25">
                        <ShieldCheck size={12} className="text-emerald-400 shrink-0" />
                        <span>Verified Credential</span>
                      </span>
                    </div>

                    {/* Certificate Title */}
                    <h3 className="font-sans text-lg font-bold text-white group-hover:text-gold-200 transition-colors leading-snug">
                      {cert.title}
                    </h3>

                    {/* Issue Metadata */}
                    <div className="mt-2 flex items-center gap-3 text-xs font-mono text-ink-400">
                      <span>
                        ISSUED: <span className="text-gold-300 font-semibold">{cert.issueDate}</span>
                      </span>
                      <span>·</span>
                      <span className="text-ink-300">
                        Category: <span className="text-white font-medium capitalize">{cert.category}</span>
                      </span>
                    </div>

                    {/* Credential ID Copy Box */}
                    {cert.credentialId && (
                      <div className="mt-4 flex items-center justify-between rounded-lg border border-[#262A38] bg-[#0E1017] px-3 py-2 text-xs font-mono group/copy">
                        <div className="min-w-0 pr-2">
                          <span className="text-[0.625rem] text-gold-500/80 uppercase block leading-none font-bold tracking-wider">
                            CREDENTIAL ID
                          </span>
                          <span className="font-semibold text-ink-200 truncate select-all block mt-1">
                            {cert.credentialId}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(cert.id, cert.credentialId!)}
                          title="Salin ID Kredensial"
                          className="flex h-7 w-7 items-center justify-center rounded border border-[#2B3144] bg-[#161924] text-ink-300 hover:text-gold-300 hover:border-gold-500/40 transition-colors shrink-0 cursor-pointer"
                        >
                          {isCopied ? (
                            <Check size={13} className="text-emerald-400" />
                          ) : (
                            <Copy size={13} />
                          )}
                        </button>
                      </div>
                    )}

                    {/* Validated Skills */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {cert.skills.map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-[#262A38] bg-[#161924] px-2.5 py-0.5 text-[0.6875rem] font-medium text-ink-300 hover:text-gold-200 hover:border-gold-400/40 transition-all cursor-default"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Verification Link */}
                  {cert.credentialUrl && (
                    <div className="mt-6 pt-3.5 border-t border-[#232736] flex items-center justify-between">
                      <span className="text-[0.6875rem] font-mono text-ink-400 flex items-center gap-1">
                        <Cpu size={11} className="text-gold-500" /> AUTHENTICATED
                      </span>
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-200 transition-colors group/link"
                      >
                        <span>Verifikasi Online</span>
                        <ArrowUpRight size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  )}
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

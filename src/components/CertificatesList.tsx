import { useState } from 'react';
import { ArrowUpRight, Copy, Check, Award, ShieldCheck } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import type { Certificate } from '../types';
import { defaultCertificates } from '../data';

export default function CertificatesList({ items = defaultCertificates }: { items?: Certificate[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <section id="certificates" className="pb-section">
      <SectionHeading
        index="05"
        title="Sertifikasi & Kredensial Terverifikasi"
        note={`${items.length} akreditasi industri`}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((cert, i) => {
          const isCopied = copiedId === cert.id;

          return (
            <Reveal key={cert.id} delay={i * 40}>
              <div className="panel p-5 flex flex-col justify-between h-full relative overflow-hidden group hover:border-brass-400/70 transition-all duration-200">
                <div>
                  {/* Top Bar: Issuer & Status */}
                  <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-rule">
                    <div className="flex items-center gap-1.5 text-[0.6875rem] font-mono text-brass-700 font-semibold uppercase tracking-wider">
                      <Award size={13} className="text-brass-600" />
                      <span>{cert.issuer}</span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[0.6875rem] font-medium text-status-open bg-status-openBg px-2 py-0.5 rounded-[2px] border border-status-open/20">
                      <ShieldCheck size={11} className="text-status-open" /> Terverifikasi
                    </span>
                  </div>

                  {/* Certificate Title */}
                  <h3 className="font-display text-base sm:text-lg font-bold text-ink-950 leading-snug group-hover:text-brass-700 transition-colors">
                    {cert.title}
                  </h3>

                  <p className="mt-1 text-meta text-ink-500">
                    Tahun Keluar: <span className="font-mono text-ink-700">{cert.issueDate}</span>
                  </p>

                  {/* Credential ID Plaque */}
                  {cert.credentialId && (
                    <div className="mt-3 flex items-center justify-between rounded-[2px] border border-rule bg-canvas-sunken px-2.5 py-1.5 text-[0.75rem] font-mono">
                      <div className="min-w-0">
                        <span className="text-[0.625rem] text-ink-500 uppercase block leading-none">
                          Credential ID
                        </span>
                        <span className="font-semibold text-ink-800 truncate select-all block mt-0.5">
                          {cert.credentialId}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(cert.id, cert.credentialId!)}
                        title="Salin ID Kredensial"
                        className="p-1 text-ink-500 hover:text-brass-700 transition-colors focus-visible:outline-none"
                      >
                        {isCopied ? <Check size={13} className="text-status-open" /> : <Copy size={13} />}
                      </button>
                    </div>
                  )}

                  {/* Validated Skills */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap gap-1">
                      {cert.skills.map((s) => (
                        <span key={s} className="tag text-[0.6875rem]">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Verification Link */}
                {cert.credentialUrl && (
                  <div className="mt-4 pt-3 border-t border-rule flex justify-end">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-meta font-medium text-brass-700 hover:text-brass-800 transition-colors"
                    >
                      <span>Verifikasi Online</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

import { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
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
        title="Sertifikasi & Lisensi"
        note={`${items.length} kredensial terverifikasi`}
      />

      <div className="panel">
        {items.map((cert, i) => {
          const isCopied = copiedId === cert.id;

          return (
            <Reveal key={cert.id} delay={i * 45}>
              <div className="row grid gap-1.5 px-5 py-4 sm:grid-cols-[124px_1fr] sm:gap-6">
                <p className="tabular text-meta text-ink-500 sm:pt-0.5">{cert.issueDate}</p>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-display text-h3 text-ink-900">{cert.title}</h3>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline ml-auto inline-flex items-center gap-1 text-meta"
                      >
                        Verifikasi <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>

                  <p className="text-meta text-brass-600 mt-0.5">{cert.issuer}</p>

                  {cert.credentialId && (
                    <div className="mt-2 inline-flex items-center gap-2 rounded-[2px] border border-rule bg-canvas-sunken px-2.5 py-1 text-meta font-mono text-ink-600">
                      <span className="text-[0.6875rem] uppercase text-ink-500">ID:</span>
                      <span className="select-all font-semibold">{cert.credentialId}</span>
                      <button
                        onClick={() => handleCopy(cert.id, cert.credentialId!)}
                        title="Salin ID Kredensial"
                        className="text-ink-500 hover:text-brass-600 transition-colors ml-1 focus-visible:outline-none"
                      >
                        {isCopied ? <Check size={12} className="text-status-open" /> : <Copy size={12} />}
                      </button>
                    </div>
                  )}

                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {cert.skills.map((s) => (
                        <span key={s} className="tag">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

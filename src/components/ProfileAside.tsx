import { useState } from 'react';
import { MapPin, Mail, Linkedin, Github, Download, ShieldCheck, Check, Copy } from 'lucide-react';
import type { SystemConfig } from '../types';

export default function ProfileAside({ config }: { config: SystemConfig }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.ownerEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="profile-aside lg:sticky lg:top-20 lg:h-fit">
      {/* Executive Portrait Frame */}
      <div className="relative group">
        <div className="w-full max-w-[240px] overflow-hidden rounded-[3px] border border-brass-400/50 bg-canvas-sunken p-1 shadow-elevated">
          <div className="overflow-hidden rounded-[2px] border border-rule">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=600&h=750&q=85"
              alt={config.ownerName}
              className="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 ease-refined group-hover:scale-[1.02]"
              loading="eager"
            />
          </div>
        </div>

        {/* Verified Accreditation Tag */}
        <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-[2px] border border-brass-400/40 bg-brass-50/90 px-2.5 py-1 text-[0.6875rem] font-mono font-medium text-brass-700">
          <ShieldCheck size={13} className="text-brass-600 shrink-0" />
          <span>VERIFIED PRINCIPAL ARCHITECT</span>
        </div>
      </div>

      {/* Name & Title */}
      <div className="mt-4">
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink-950">
          {config.ownerName}
        </h1>
        <p className="mt-1 font-sans text-meta font-semibold text-brass-700">
          {config.ownerTitle}
        </p>
      </div>

      {/* Meaningful Brass Line */}
      <div className="my-4 h-px w-12 bg-gradient-to-r from-brass-500 to-transparent" />

      {/* Core Tagline */}
      <p className="max-w-[32ch] text-meta text-ink-700 leading-relaxed font-sans">
        {config.heroTagline}
      </p>

      {/* Availability Status Card */}
      {config.availableForWork && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-[3px] border border-status-open/30 bg-status-openBg px-3 py-1.5 text-[0.75rem] font-medium text-status-open">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-open opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-status-open"></span>
          </span>
          <span>Tersedia untuk Advisory & Kontrak</span>
        </div>
      )}

      {/* Contact Dossier Definition List */}
      <dl className="mt-5 space-y-2.5 border-t border-rule pt-4 text-meta">
        {/* Location */}
        <div className="flex items-center gap-2.5 text-ink-600">
          <MapPin size={14} className="shrink-0 text-brass-600" strokeWidth={1.75} />
          <span className="text-meta text-ink-700">{config.ownerLocation}</span>
        </div>

        {/* Email with copy */}
        <div className="flex items-center justify-between gap-2 text-ink-600">
          <div className="flex items-center gap-2.5 min-w-0">
            <Mail size={14} className="shrink-0 text-brass-600" strokeWidth={1.75} />
            <a
              href={`mailto:${config.ownerEmail}`}
              className="link-underline text-meta text-ink-800 truncate"
            >
              {config.ownerEmail}
            </a>
          </div>
          <button
            onClick={handleCopyEmail}
            title="Salin Email"
            className="shrink-0 p-1 text-ink-400 hover:text-brass-600 transition-colors focus-visible:outline-none"
          >
            {copied ? <Check size={12} className="text-status-open" /> : <Copy size={12} />}
          </button>
        </div>

        {/* LinkedIn */}
        {config.ownerLinkedIn && (
          <div className="flex items-center gap-2.5 text-ink-600">
            <Linkedin size={14} className="shrink-0 text-brass-600" strokeWidth={1.75} />
            <a
              href={config.ownerLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-meta"
            >
              linkedin.com/in/bramastyokusumo
            </a>
          </div>
        )}

        {/* GitHub */}
        {config.ownerGithub && (
          <div className="flex items-center gap-2.5 text-ink-600">
            <Github size={14} className="shrink-0 text-brass-600" strokeWidth={1.75} />
            <a
              href={config.ownerGithub}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-meta"
            >
              github.com/tyobramas
            </a>
          </div>
        )}
      </dl>

      {/* CV Download Button */}
      <a
        href="/cv-tyo-bramas.pdf"
        download
        className="no-print mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[3px] bg-ink-950 px-4 py-2.5 text-meta font-semibold text-canvas shadow-card transition-all duration-200 ease-refined hover:bg-brass-700 hover:shadow-gold"
      >
        <Download size={14} strokeWidth={2} /> Unduh Curriculum Vitae (PDF)
      </a>

      {/* Institutional seal */}
      <div className="mt-4 border-t border-rule pt-3 text-[0.6875rem] font-mono text-ink-500 space-y-0.5">
        <p className="text-ink-600 font-semibold">Tyo Bramas, B.Comp</p>
        <p>Alumni Universitas BSI (2010 — 2013)</p>
        <p className="text-[0.625rem] text-ink-400 pt-0.5">
          Diperbarui {new Date(config.updatedAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
        </p>
      </div>
    </aside>
  );
}

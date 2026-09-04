import { MapPin, Mail, Linkedin, Github, Download } from 'lucide-react';
import type { SystemConfig } from '../types';

export default function ProfileAside({ config }: { config: SystemConfig }) {
  return (
    <aside className="profile-aside lg:sticky lg:top-20 lg:h-fit">
      {/* Foto: potret 4:5, sudut hampir lurus, hairline brass tipis */}
      <div className="w-[168px] overflow-hidden rounded-[3px] border border-rule bg-canvas-sunken shadow-card">
        {config.ownerAvatar ? (
          <img
            src={config.ownerAvatar}
            alt={config.ownerName}
            className="aspect-[4/5] w-full object-cover object-top"
            loading="eager"
          />
        ) : (
          <div className="aspect-[4/5] w-full flex items-center justify-center bg-canvas-sunken text-brass-600 font-display text-2xl font-bold">
            TB
          </div>
        )}
      </div>

      <div className="mt-6">
        <p className="eyebrow">Principal Software Engineer</p>
        <h1 className="mt-1.5 font-display text-h1 text-ink-900">{config.ownerName}</h1>
        <p className="mt-1 text-body text-ink-600">{config.ownerTitle}</p>
      </div>

      {/* Garis brass sebagai pemisah bermakna — bukan dekorasi */}
      <div className="my-5 h-px w-12 bg-brass-500" />

      <p className="max-w-[30ch] text-body text-ink-700">{config.heroTagline}</p>

      {config.availableForWork && (
        <p className="mt-5 inline-flex items-center gap-2 rounded-[2px] border border-status-open/25 bg-status-openBg px-2.5 py-1 text-meta font-medium text-status-open">
          <span className="h-1.5 w-1.5 rounded-full bg-status-open" />
          Terbuka untuk peluang baru
        </p>
      )}

      {/* Kontak: daftar definisi, bukan kartu-kartu */}
      <dl className="mt-6 space-y-2.5 border-t border-rule pt-5 text-meta">
        {[
          { Icon: MapPin, label: config.ownerLocation },
          { Icon: Mail, label: config.ownerEmail, href: `mailto:${config.ownerEmail}` },
          { Icon: Linkedin, label: 'LinkedIn', href: config.ownerLinkedIn },
          { Icon: Github, label: 'GitHub', href: config.ownerGithub },
        ]
          .filter((i) => i.label)
          .map(({ Icon, label, href }) => (
            <div key={label} className="flex items-center gap-2.5 text-ink-600">
              <Icon size={14} className="shrink-0 text-brass-500" strokeWidth={1.75} />
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className="link-underline text-meta">
                  {label}
                </a>
              ) : (
                <span>{label}</span>
              )}
            </div>
          ))}
      </dl>

      <a
        href="/cv-tyo-bramas.pdf"
        download
        className="no-print mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[3px] bg-ink-900 px-4 py-2.5 text-meta font-semibold text-canvas transition-colors duration-200 ease-refined hover:bg-brass-600"
      >
        <Download size={14} strokeWidth={2} /> Unduh CV (PDF)
      </a>

      <p className="mt-4 text-[0.6875rem] text-ink-400">
        Diperbarui{' '}
        {new Date(config.updatedAt).toLocaleDateString('id-ID', {
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </aside>
  );
}

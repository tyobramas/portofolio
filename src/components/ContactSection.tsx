import React, { useState } from 'react';
import { Mail, MapPin, Copy, Check, Clock, Send, ShieldCheck } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import type { SystemConfig } from '../types';

const SCOPES = [
  'Rekayasa Aplikasi Mobile (Flutter)',
  'Otomasi AI & Pipeline Agent (n8n, Langflow)',
  'Arsitektur Backend & Cloud SaaS (Laravel, React)',
  'Peran Principal / Lead Software Engineer',
  'Konsultasi Teknis & Audit Arsitektur',
];

export default function ContactSection({ config }: { config: SystemConfig }) {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: SCOPES[0],
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.ownerEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const subject = encodeURIComponent(`[Inquiry Proyek] ${formData.scope} — ${formData.name}`);
    const body = encodeURIComponent(
      `Halo Tyo Bramas,\n\nNama: ${formData.name}\nEmail: ${formData.email}\nKebutuhan: ${formData.scope}\n\nRingkasan Kebutuhan:\n${formData.message}\n\nTerima kasih.`
    );

    setTimeout(() => {
      window.location.href = `mailto:${config.ownerEmail}?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <section id="contact" className="pb-section">
      <SectionHeading index="06" title="Kontak & Kerja Sama" note="SLA respons < 24 jam" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Left Column: Direct Info */}
        <Reveal>
          <div className="panel p-6 space-y-5">
            <div>
              <p className="eyebrow">Saluran Langsung</p>
              <p className="mt-1 font-display text-h3 text-ink-900 break-all select-all">
                {config.ownerEmail}
              </p>
              <div className="mt-3 flex gap-2">
                <a
                  href={`mailto:${config.ownerEmail}`}
                  className="inline-flex items-center gap-1.5 rounded-[3px] bg-ink-900 px-3 py-1.5 text-meta font-semibold text-canvas hover:bg-brass-600 transition-colors duration-150"
                >
                  <Mail size={13} /> Kirim Email
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-[3px] border border-rule bg-canvas-sunken px-3 py-1.5 text-meta font-medium text-ink-700 hover:text-brass-600 transition-colors"
                >
                  {copied ? <Check size={13} className="text-status-open" /> : <Copy size={13} />}
                  {copied ? 'Tersalin' : 'Salin'}
                </button>
              </div>
            </div>

            <div className="border-t border-rule pt-4 space-y-3 text-meta text-ink-600">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-brass-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ink-800">Lokasi & Zona Waktu</p>
                  <p>{config.ownerLocation} (WIB / UTC+7)</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock size={15} className="text-brass-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ink-800">Komitmen SLA</p>
                  <p>Maksimal 24 jam di hari kerja</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck size={15} className="text-brass-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ink-800">Kerahasiaan</p>
                  <p>Terlindungi NDA & komunikasi langsung tanpa perantara</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Clean Form */}
        <Reveal delay={80}>
          <div className="panel p-6 sm:p-7">
            <h3 className="font-display text-h3 text-ink-900 mb-1.5">Kirim Permintaan Diskusi</h3>
            <p className="text-body text-ink-600 mb-5">
              Jelaskan gambaran proyek atau peran yang sedang Anda bangun untuk mendapatkan tanggapan langsung.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-meta font-semibold text-ink-800 mb-1">
                    Nama / Institusi <span className="text-brass-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda atau Perusahaan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-[3px] border border-rule bg-canvas px-3.5 py-2 text-body text-ink-900 placeholder:text-ink-400 focus-visible:border-brass-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-meta font-semibold text-ink-800 mb-1">
                    Alamat Email Kerja <span className="text-brass-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@perusahaan.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-[3px] border border-rule bg-canvas px-3.5 py-2 text-body text-ink-900 placeholder:text-ink-400 focus-visible:border-brass-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-meta font-semibold text-ink-800 mb-1">
                  Ruang Lingkup Proyek
                </label>
                <select
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full rounded-[3px] border border-rule bg-canvas px-3.5 py-2 text-body text-ink-900 focus-visible:border-brass-500 transition-colors"
                >
                  {SCOPES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-meta font-semibold text-ink-800 mb-1">
                  Deskripsi Kebutuhan <span className="text-brass-600">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Target sistem, estimasi jadwal, dan tantangan teknis utama..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-[3px] border border-rule bg-canvas px-3.5 py-2 text-body text-ink-900 placeholder:text-ink-400 focus-visible:border-brass-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-[3px] bg-ink-900 px-6 py-2.5 text-meta font-semibold text-canvas transition-colors duration-200 ease-refined hover:bg-brass-600"
              >
                {submitted ? (
                  <>
                    <Check size={14} /> Membuka Email Client...
                  </>
                ) : (
                  <>
                    <Send size={14} /> Kirim Pesan Diskusi
                  </>
                )}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

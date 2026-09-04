import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, ExternalLink, ShieldCheck,
  Sparkles, Copy, Check
} from 'lucide-react';
import type { Certificate } from '../types';
import { defaultCertificates } from '../data';

interface CertificatesSectionProps {
  certificates?: Certificate[];
}

type CertCategory = 'all' | 'ai' | 'mobile' | 'backend' | 'cloud' | 'academic';

const CATEGORIES: { id: CertCategory; label: string }[] = [
  { id: 'all',      label: 'All Certifications' },
  { id: 'ai',       label: 'AI & Autonomous Agents' },
  { id: 'mobile',   label: 'Mobile Engineering' },
  { id: 'backend',  label: 'Backend & SaaS' },
  { id: 'cloud',    label: 'Cloud & DevOps' },
  { id: 'academic', label: 'Academic Degrees' },
];

const ISSUER_COLORS: Record<string, { badge: string; border: string; glow: string; text: string; bg: string }> = {
  ai: {
    badge: 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40',
    border: 'border-cyan-400/40 hover:border-cyan-300',
    glow: 'from-cyan-500/20 via-sky-500/10 to-transparent',
    text: 'text-cyan-300',
    bg: 'bg-cyan-950/60',
  },
  mobile: {
    badge: 'bg-sky-950/70 text-sky-300 border-sky-500/40',
    border: 'border-sky-400/40 hover:border-sky-300',
    glow: 'from-sky-500/20 via-blue-500/10 to-transparent',
    text: 'text-sky-300',
    bg: 'bg-sky-950/60',
  },
  backend: {
    badge: 'bg-indigo-950/70 text-indigo-300 border-indigo-500/40',
    border: 'border-indigo-400/40 hover:border-indigo-300',
    glow: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    text: 'text-indigo-300',
    bg: 'bg-indigo-950/60',
  },
  cloud: {
    badge: 'bg-amber-950/70 text-amber-300 border-amber-500/40',
    border: 'border-amber-400/40 hover:border-amber-300',
    glow: 'from-amber-500/20 via-orange-500/10 to-transparent',
    text: 'text-amber-300',
    bg: 'bg-amber-950/60',
  },
  academic: {
    badge: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40',
    border: 'border-emerald-400/40 hover:border-emerald-300',
    glow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    text: 'text-emerald-300',
    bg: 'bg-emerald-950/60',
  },
};

const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  certificates = defaultCertificates,
}) => {
  const [activeCategory, setActiveCategory] = useState<CertCategory>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredCerts = activeCategory === 'all'
    ? certificates
    : certificates.filter(c => c.category === activeCategory);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="certificates" aria-label="Certifications & Credentials" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-sans text-xs font-semibold tracking-wider uppercase mb-3">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span>Verified Credentials & Accreditations</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Certifications & Licenses
          </h2>
          <p className="text-slate-300 font-sans text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Industry-recognized accreditations validating mastery in AI Automation, Multi-Agent Architecture, Mobile Engineering, and Computer Science.
          </p>
        </motion.div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={[
                  'px-4 py-2 rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer',
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white shadow-[0_0_16px_rgba(56,189,248,0.3)] border border-cyan-300/50 scale-[1.02]'
                    : 'bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-850',
                ].join(' ')}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Certificates Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, i) => {
              const theme = ISSUER_COLORS[cert.category] || ISSUER_COLORS.ai;
              const isCopied = copiedId === cert.id;

              return (
                <motion.div
                  layout
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className={`glass-panel p-6 flex flex-col justify-between border ${theme.border} rounded-2xl relative overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-200`}
                >
                  {/* Subtle top ambient glow */}
                  <div className={`absolute top-0 right-0 left-0 h-24 bg-gradient-to-b ${theme.glow} opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                  <div className="relative z-10">
                    {/* Header: Issuer & Verified Status */}
                    <div className="flex items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-slate-700/50">
                      <span className={`font-sans text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${theme.badge} uppercase tracking-wider`}>
                        {cert.issuer}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-md">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        <span>Verified</span>
                      </span>
                    </div>

                    {/* Certificate Title */}
                    <h3 className="font-display font-bold text-white text-lg sm:text-xl mb-2 group-hover:text-cyan-300 transition-colors leading-snug">
                      {cert.title}
                    </h3>

                    {/* Issuer & Year */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-slate-300 mb-4">
                      <span className="font-semibold text-cyan-400">{cert.issuer}</span>
                      <span>&bull;</span>
                      <span className="text-slate-400">Issued {cert.issueDate}</span>
                    </div>

                    {/* Credential ID Bar */}
                    {cert.credentialId && (
                      <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-2.5 mb-4 flex items-center justify-between text-xs font-mono">
                        <div className="min-w-0">
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Credential ID</p>
                          <p className="text-slate-200 font-semibold truncate select-all">{cert.credentialId}</p>
                        </div>
                        <button
                          onClick={() => handleCopy(cert.id, cert.credentialId!)}
                          title="Copy Credential ID"
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shrink-0 ml-2"
                        >
                          {isCopied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                        </button>
                      </div>
                    )}

                    {/* Certified Skills */}
                    <div className="space-y-1.5 mb-4">
                      <p className="font-sans text-[11px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={12} className="text-cyan-400" /> Validated Skills:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills.map(skill => (
                          <span
                            key={skill}
                            className="font-sans text-[11px] px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/70 text-slate-300 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Verification Link Button */}
                  {cert.credentialUrl && (
                    <div className="relative z-10 pt-3 border-t border-slate-700/60">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl font-sans text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 hover:bg-cyan-900/50 hover:border-cyan-400 hover:text-white transition-all shadow-sm group-hover:shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                      >
                        <span>Verify Accreditation Online</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default CertificatesSection;

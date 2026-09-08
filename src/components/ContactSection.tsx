import { useState } from 'react';
import {
  Mail,
  MapPin,
  Copy,
  Check,
  Download,
  Eye,
  ShieldCheck,
  FileText,
  Sparkles,
  Github,
  Linkedin,
  CheckCircle2,
} from 'lucide-react';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';
import CvModal from './CvModal';
import { downloadCvPdf } from '../utils/generateCvPdf';
import type { SystemConfig } from '../types';

export default function ContactSection({ config }: { config: SystemConfig }) {
  const [copied, setCopied] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.ownerEmail || 'bramastyodevops@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const email = config.ownerEmail || 'bramastyodevops@gmail.com';

  return (
    <section id="contact" className="relative py-12 sm:py-16">
      <div className="shell">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-widest text-gold-400">
              <Sparkles size={12} className="text-gold-accent" />
              <span>EXECUTIVE DOSSIER & DIRECT CONTACT</span>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Let's Build Something Exceptional
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="text-xs sm:text-sm text-ink-300 max-w-xl mx-auto">
              Direct access for mission-critical AI, mobile, and full-stack engineering roles. Instant downloadable curriculum vitae.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 items-stretch">
          {/* Left Column: Direct Inquiries & Channels (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <Reveal>
              <SpotlightCard
                className="p-6 sm:p-7 space-y-6 group h-full flex flex-col justify-between bg-[#0C0E14] border-[#222634] rounded-2xl"
                spotlightColor="rgba(229, 169, 60, 0.16)"
                borderColor="rgba(245, 200, 105, 0.4)"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#202534] pb-4">
                    <div>
                      <span className="text-[0.6875rem] font-mono font-bold uppercase tracking-wider text-gold-400 block">
                        DIRECT INQUIRY CHANNEL
                      </span>
                      <h3 className="font-sans text-lg font-bold text-white mt-0.5">
                        Get In Touch
                      </h3>
                    </div>
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" title="Available for projects" />
                  </div>

                  {/* Email & 1-Click Copy */}
                  <div className="rounded-xl border border-[#232736] bg-[#08090D] p-4 space-y-3">
                    <span className="text-[0.625rem] font-mono uppercase text-ink-400 block">
                      PRIMARY EMAIL ADDRESS
                    </span>
                    <p className="font-mono text-sm sm:text-base text-gold-300 font-bold select-all break-all">
                      {email}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <a
                        href={`mailto:${email}`}
                        className="btn-gold inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider text-canvas cursor-pointer shadow-gold-sm"
                      >
                        <Mail size={13} /> Send Email
                      </a>
                      <button
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#2B3144] bg-[#141722] px-3.5 py-2 text-xs font-mono font-semibold text-ink-200 hover:text-white hover:border-gold-500/40 transition-colors cursor-pointer"
                      >
                        {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                        <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Metadata: Location & NDA */}
                  <div className="space-y-3 pt-2 text-xs text-ink-300">
                    <div className="flex items-start gap-3 rounded-lg border border-[#1E2230] bg-[#10121A] p-3">
                      <MapPin size={16} className="text-gold-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white">Location & Timezone</p>
                        <p className="text-ink-400 text-[11.5px] mt-0.5">
                          {config.ownerLocation || 'Jakarta, Indonesia'} (UTC+7) · Remote / Distributed Worldwide
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border border-[#1E2230] bg-[#10121A] p-3">
                      <ShieldCheck size={16} className="text-gold-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white">Non-Disclosure & Security</p>
                        <p className="text-ink-400 text-[11.5px] mt-0.5">
                          Proprietary systems, technical roadmaps, and client IP protected under strict mutual NDA.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Profiles Row */}
                <div className="pt-4 border-t border-[#202534] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-ink-400">Professional Networks:</span>
                  <div className="flex items-center gap-2">
                    {config.ownerGithub && (
                      <a
                        href={config.ownerGithub}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262A38] bg-[#12141C] text-ink-300 hover:text-white hover:border-gold-400 transition-colors"
                        title="GitHub Profile"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {config.ownerLinkedIn && (
                      <a
                        href={config.ownerLinkedIn}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262A38] bg-[#12141C] text-ink-300 hover:text-white hover:border-gold-400 transition-colors"
                        title="LinkedIn Profile"
                      >
                        <Linkedin size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>

          {/* Right Column: Curriculum Vitae Dossier Hub (7 cols) */}
          <div className="lg:col-span-7">
            <Reveal delay={60}>
              <SpotlightCard
                className="p-6 sm:p-7 group h-full flex flex-col justify-between bg-[#0C0E14] border-[#222634] rounded-2xl relative overflow-hidden"
                spotlightColor="rgba(229, 169, 60, 0.18)"
                borderColor="rgba(245, 200, 105, 0.45)"
              >
                <div className="space-y-5">
                  {/* CV Header Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#202534] pb-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500/15 border border-gold-500/30 text-gold-accent">
                        <FileText size={17} />
                      </span>
                      <div>
                        <span className="text-[0.6875rem] font-mono font-bold uppercase tracking-wider text-gold-400 block">
                          OFFICIAL CURRICULUM VITAE
                        </span>
                        <h3 className="font-sans text-lg font-bold text-white mt-0.5">
                          Executive Resume & Dossier
                        </h3>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono text-ink-300 border border-[#282E3E] bg-[#121520] px-2.5 py-1 rounded-md">
                      ATS-Optimized PDF · 2 Pages
                    </span>
                  </div>

                  {/* CV Interactive Preview Card Simulation */}
                  <div className="rounded-xl border border-[#262B3A] bg-[#07080D] p-4 sm:p-5 space-y-3.5 shadow-inner">
                    <div className="flex items-baseline justify-between border-b border-[#1C202E] pb-2.5">
                      <div>
                        <h4 className="font-sans text-base sm:text-lg font-extrabold text-white">
                          Bramastyo Kusumo
                        </h4>
                        <p className="text-[11px] sm:text-xs font-mono text-gold-400">
                          Senior Full-Stack & Autonomous AI Systems Engineer · Lead Mobile Architect
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded shrink-0">
                        10+ Years
                      </span>
                    </div>

                    {/* Highlights Pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                      <div className="rounded-md bg-[#11131B] border border-[#202534] p-2 text-center">
                        <span className="text-gold-400 font-bold block">10+ Yrs</span>
                        <span className="text-ink-400 text-[10px]">Experience</span>
                      </div>
                      <div className="rounded-md bg-[#11131B] border border-[#202534] p-2 text-center">
                        <span className="text-gold-400 font-bold block">Flutter</span>
                        <span className="text-ink-400 text-[10px]">Early Pioneer</span>
                      </div>
                      <div className="rounded-md bg-[#11131B] border border-[#202534] p-2 text-center">
                        <span className="text-gold-400 font-bold block">AI Agents</span>
                        <span className="text-ink-400 text-[10px]">Autonomous</span>
                      </div>
                      <div className="rounded-md bg-[#11131B] border border-[#202534] p-2 text-center">
                        <span className="text-gold-400 font-bold block">IBM & Google</span>
                        <span className="text-ink-400 text-[10px]">Accredited</span>
                      </div>
                    </div>

                    {/* Summary Excerpt */}
                    <div className="space-y-1.5 pt-1">
                      <p className="text-xs text-ink-300 leading-relaxed line-clamp-3">
                        Proven engineering leader with extensive tenure across enterprise web architectures (since 2013), early Flutter cross-platform mobile frameworks, remote architectures (PT Passion Abadi, PT 3D, PT Rekayasa Digital), and production Autonomous Multi-Agent AI systems. Motto: "We Build Solutions."
                      </p>
                    </div>

                    {/* Features Included List */}
                    <div className="pt-2 border-t border-[#1C202E] grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-ink-300">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-gold-accent shrink-0" />
                        <span>Core Technical Competency Matrix</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-gold-accent shrink-0" />
                        <span>Full Professional Career Milestones</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-gold-accent shrink-0" />
                        <span>Flagship Project Architectures & Impact</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-gold-accent shrink-0" />
                        <span>IBM & Google.org AI Certifications</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CV Action Buttons */}
                <div className="pt-5 mt-4 border-t border-[#202534] flex flex-wrap items-center gap-3">
                  {/* Instant Download Button */}
                  <button
                    type="button"
                    onClick={downloadCvPdf}
                    className="btn-gold btn-gold-shimmer flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-canvas shadow-gold-glow cursor-pointer transition-all hover:scale-[1.02]"
                  >
                    <Download size={16} />
                    <span>DOWNLOAD OFFICIAL CV (PDF)</span>
                  </button>

                  {/* Interactive Preview Modal Button */}
                  <button
                    type="button"
                    onClick={() => setCvModalOpen(true)}
                    className="btn-dark-outline inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-ink-100 cursor-pointer hover:border-gold-400 hover:text-white transition-colors"
                  >
                    <Eye size={15} className="text-gold-accent" />
                    <span>PREVIEW CV</span>
                  </button>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Interactive CV Fullscreen Modal */}
      <CvModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </section>
  );
}

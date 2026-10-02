import { useState } from 'react';
import {
  Mail,
  MapPin,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  Linkedin,
  CheckCircle2,
  Globe,
  ArrowUpRight,
} from 'lucide-react';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';
import type { SystemConfig } from '../types';

export default function ContactSection({ config }: { config: SystemConfig }) {
  const [copied, setCopied] = useState(false);

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
            <div className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-[0.6875rem] font-bold uppercase tracking-widest text-gold-400">
              <Sparkles size={12} className="text-gold-accent" />
              <span>OPEN OPPORTUNITY · REMOTE & PROJECT-BASED</span>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Let's Build Something Exceptional
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="text-xs sm:text-sm text-ink-300 max-w-xl mx-auto">
              <strong className="text-gold-300">Actively Open for Opportunities:</strong> High-impact Remote Engineering Contracts, Turnkey Project-Based Delivery, and Fractional AI / Mobile Architecture worldwide.
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
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full">
                      <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Available for Hire</span>
                    </div>
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

          {/* Right Column: Global Remote & Project-Based Collaboration (7 cols) */}
          <div className="lg:col-span-7">
            <Reveal delay={60}>
              <SpotlightCard
                className="p-6 sm:p-7 group h-full flex flex-col justify-between bg-[#0C0E14] border-[#222634] rounded-2xl relative overflow-hidden"
                spotlightColor="rgba(229, 169, 60, 0.18)"
                borderColor="rgba(245, 200, 105, 0.45)"
              >
                <div className="space-y-5">
                  {/* Engagement Header Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#202534] pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500/15 border border-gold-500/30 text-gold-accent">
                        <Globe size={18} />
                      </span>
                      <div>
                        <span className="text-[0.6875rem] font-mono font-bold uppercase tracking-wider text-gold-400 block">
                          OPEN OPPORTUNITY
                        </span>
                        <h3 className="font-sans text-lg sm:text-xl font-bold text-white mt-0.5">
                          Remote & Project-Based Engagements
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 rounded-md font-semibold">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Actively Open for Work · 100% WFA</span>
                    </div>
                  </div>

                  {/* Remote Readiness Dossier Card */}
                  <div className="rounded-xl border border-[#262B3A] bg-[#07080D] p-4 sm:p-5 space-y-3.5 shadow-inner">
                    {/* Active Opportunity Callout */}
                    <div className="rounded-lg bg-gradient-to-r from-gold-500/15 via-gold-500/10 to-[#10121B] border border-gold-500/30 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gold-500/20 text-gold-accent shrink-0 font-bold text-xs">
                          ★
                        </span>
                        <div>
                          <span className="text-xs font-bold text-white block">
                            Open for Remote & Project Engagements
                          </span>
                          <span className="text-[11px] text-ink-300">
                            Available for overseas contracts, turnkey projects, and sprint consulting
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-gold-300 bg-[#07080D] px-2 py-0.5 rounded border border-gold-500/25 shrink-0 self-start sm:self-center">
                        Worldwide Overlap
                      </span>
                    </div>

                    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#1C202E] pb-2.5">
                      <div>
                        <h4 className="font-sans text-base sm:text-lg font-extrabold text-white">
                          Senior Engineering & AI Systems Architect
                        </h4>
                        <p className="text-[11px] sm:text-xs font-mono text-gold-400">
                          Cross-Border Delivery · Async-First · Autonomous Execution
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-gold-300 bg-gold-500/10 border border-gold-500/20 px-2 py-0.5 rounded shrink-0">
                        Zero Timezone Friction
                      </span>
                    </div>

                    {/* Capability Pillars */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                      <div className="rounded-md bg-[#11131B] border border-[#202534] p-2 text-center">
                        <span className="text-gold-400 font-bold block">Remote & WFA</span>
                        <span className="text-ink-400 text-[10px]">100% Distributed</span>
                      </div>
                      <div className="rounded-md bg-[#11131B] border border-[#202534] p-2 text-center">
                        <span className="text-gold-400 font-bold block">Project-Based</span>
                        <span className="text-ink-400 text-[10px]">Turnkey & MVPs</span>
                      </div>
                      <div className="rounded-md bg-[#11131B] border border-[#202534] p-2 text-center">
                        <span className="text-gold-400 font-bold block">Flexible Shift</span>
                        <span className="text-ink-400 text-[10px]">US / EU / APAC Overlap</span>
                      </div>
                      <div className="rounded-md bg-[#11131B] border border-[#202534] p-2 text-center">
                        <span className="text-gold-400 font-bold block">Contract & Lead</span>
                        <span className="text-ink-400 text-[10px]">Sprint or Retainer</span>
                      </div>
                    </div>

                    {/* Persuasive Pitch Narrative */}
                    <div className="space-y-1.5 pt-1">
                      <p className="text-xs text-ink-300 leading-relaxed">
                        <strong className="text-white font-semibold">Actively seeking and open to remote and project-based opportunities.</strong> Proven tenure delivering enterprise web platforms, production multi-agent AI systems, and flagship mobile applications with zero micromanagement. Timezone differences are never a bottleneck: operating with high-cadence asynchronous execution (clean RFCs, documented PRs, proactive video demos) paired with guaranteed daily synchronous overlap for any global working hours.
                      </p>
                    </div>

                    {/* Engagement Guarantees */}
                    <div className="pt-2 border-t border-[#1C202E] grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-ink-300">
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 size={13} className="text-gold-accent shrink-0 mt-0.5" />
                        <span><strong className="text-white">Open for Remote Roles:</strong> Senior engineering lead integrated directly into your distributed team</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 size={13} className="text-gold-accent shrink-0 mt-0.5" />
                        <span><strong className="text-white">Project-Based Delivery:</strong> Turnkey MVPs, AI multi-agent workflows & cross-platform apps</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 size={13} className="text-gold-accent shrink-0 mt-0.5" />
                        <span><strong className="text-white">Timezone Agnostic:</strong> Flexible core hours scheduled to match your sprint standups</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 size={13} className="text-gold-accent shrink-0 mt-0.5" />
                        <span><strong className="text-white">Enterprise IP Security:</strong> Commercial confidentiality protected under mutual NDA</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Engagement Action Bar */}
                <div className="pt-4 mt-4 border-t border-[#202534] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] font-mono text-ink-400 text-center sm:text-left">
                    <span className="text-gold-400 font-semibold">Response window:</span> Within 12–24h · Worldwide opportunities welcome
                  </div>

                  <a
                    href={`mailto:${email}?subject=Remote%20Opportunity%20/%20Project%20Inquiry`}
                    className="btn-gold inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-wider text-canvas cursor-pointer shadow-gold-sm hover:shadow-gold-glow transition-all w-full sm:w-auto shrink-0"
                  >
                    <Mail size={14} />
                    <span>Discuss Remote / Project Opportunity</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

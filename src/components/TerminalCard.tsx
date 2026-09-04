import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Mail, Github, Linkedin, ChevronDown, Sparkles,
  CheckCircle2, ShieldCheck, Award, Globe2,
  User, Terminal, ArrowRight
} from 'lucide-react';
import GoldButton from './GoldButton';
import type { SystemConfig } from '../types';

interface TerminalCardProps {
  config: SystemConfig;
}

const TerminalCard: React.FC<TerminalCardProps> = ({ config }) => {
  const [imgError, setImgError] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      aria-label="Executive Profile"
      className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 pt-20 pb-12"
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Main 2-Column Executive Hero Grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
          
          {/* ─── Left Column (8 cols): Executive Dossier & Strategic Overview ─── */}
          <motion.div
            className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="glass-panel p-6 sm:p-8 flex flex-col justify-between h-full border border-slate-700/60 shadow-2xl relative overflow-hidden">
              {/* Background ambient refraction highlight */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

              <div>
                {/* Top Executive Badge Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 pb-3 border-b border-slate-700/50">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-sans text-xs font-semibold tracking-wider uppercase">
                    <ShieldCheck size={14} className="text-cyan-400" />
                    <span>Executive Technical Lead · 13+ Yrs Exp</span>
                  </div>

                  {config.availableForWork && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-sans text-xs bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Available for Projects & Hiring
                    </span>
                  )}
                </div>

                {/* Name & Title */}
                <div className="space-y-1.5 mb-4">
                  <p className="font-sans text-xs text-cyan-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
                    <Sparkles size={14} /> Principal Software Engineer & AI Architect
                  </p>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    {config.ownerName}
                  </h1>
                  <p className="text-cyan-300 font-sans text-sm sm:text-base font-semibold tracking-normal">
                    {config.ownerTitle}
                  </p>
                </div>

                {/* Executive Value Proposition & CTA */}
                <div className="bg-slate-900/80 border border-slate-700/70 rounded-xl p-4 sm:p-5 mb-5 shadow-inner">
                  <p className="text-slate-100 font-sans text-sm sm:text-[15px] leading-relaxed font-normal">
                    Architecting mission-critical <strong className="text-cyan-300 font-semibold">Enterprise AI Automation</strong> (n8n & Langflow), <strong className="text-cyan-300 font-semibold">Autonomous Agent Systems</strong> (Hermes, Multi-Agent), <strong className="text-cyan-300 font-semibold">Production RAG Engines</strong>, and Scalable <strong className="text-cyan-300 font-semibold">Mobile (Flutter) & SaaS Platforms</strong> (Laravel & React). Backed by 13+ years of engineering leadership — let’s build and scale your next high-impact system together.
                  </p>
                </div>

                {/* Executive Key Track Record Ticker */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
                  {[
                    { label: 'Engineering Experience', value: '13+ Yrs', note: 'Active Since 2013' },
                    { label: 'Enterprise Systems', value: '40+', note: 'Mobile, SaaS & Web' },
                    { label: 'Global AI & Agents', value: 'Autonomous AI', note: 'Multi-Agent, Hermes & RAG' },
                    { label: 'Cloud & System Uptime', value: '99.9%', note: 'Multi-Tenant Architecture' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5 text-center">
                      <p className="font-display text-cyan-300 font-bold text-base sm:text-lg">{stat.value}</p>
                      <p className="font-sans text-slate-200 text-xs font-semibold mt-0.5">{stat.label}</p>
                      <p className="font-sans text-slate-400 text-[10px] mt-0.5">{stat.note}</p>
                    </div>
                  ))}
                </div>

                {/* Core Competency Badges */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-700/50 mb-6">
                  {[
                    { label: 'AI Automation (n8n · Langflow)', color: 'text-cyan-300 border-cyan-500/40 bg-cyan-950/40' },
                    { label: 'Autonomous Agents & Hermes',     color: 'text-purple-300 border-purple-500/40 bg-purple-950/40' },
                    { label: 'RAG Architecture & Vector DB',  color: 'text-emerald-300 border-emerald-500/40 bg-emerald-950/40' },
                    { label: 'Mobile Engineering (Flutter)',   color: 'text-sky-300 border-sky-500/40 bg-sky-950/40' },
                    { label: 'Full-Stack (Laravel · React)',   color: 'text-indigo-300 border-indigo-500/40 bg-indigo-950/40' },
                    { label: 'Cloud Architecture & DevOps',    color: 'text-amber-300 border-amber-500/40 bg-amber-950/40' },
                  ].map(b => (
                    <span
                      key={b.label}
                      className={`font-sans text-xs px-3 py-1 rounded-lg border font-medium ${b.color}`}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button Row */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3 border-t border-slate-800/60">
                <GoldButton
                  size="md"
                  onClick={() => scrollToSection('projects')}
                  icon={<Terminal size={15} />}
                  className="px-5 py-2.5 shadow-md text-sm"
                >
                  View Case Studies
                </GoldButton>
                <GoldButton
                  variant="outline"
                  size="md"
                  onClick={() => scrollToSection('contact')}
                  icon={<Mail size={15} />}
                  className="px-5 py-2.5 text-sm"
                >
                  Hire for Project / Contact
                </GoldButton>
                <button
                  onClick={() => scrollToSection('about')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 font-sans font-medium text-xs text-slate-300 hover:text-cyan-300 transition-colors ml-auto"
                >
                  <span>Read Profile</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* ─── Right Column (4-5 cols): Executive Photo Card & Credentials ─── */}
          <motion.div
            className="lg:col-span-5 xl:col-span-4 flex flex-col"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="glass-panel pixel-border-gold p-6 flex flex-col justify-between h-full border border-cyan-500/30 shadow-2xl relative overflow-hidden text-center">
              
              {/* Photo Showcase Frame */}
              <div className="relative mx-auto w-full max-w-[240px] aspect-square rounded-2xl p-1 bg-gradient-to-br from-cyan-400/40 via-sky-500/20 to-purple-600/40 border border-cyan-400/40 shadow-xl mb-4 group">
                
                {/* Floating Status Pill */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap px-3 py-0.5 rounded-full bg-slate-950/90 border border-emerald-400/50 text-emerald-300 font-sans text-[11px] font-semibold tracking-wider flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>PRINCIPAL / LEAD LEVEL</span>
                </div>

                <div className="w-full h-full rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center relative">
                  {config.ownerAvatar && !imgError ? (
                    <img
                      src={config.ownerAvatar}
                      alt={config.ownerName}
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 flex flex-col items-center justify-center p-4">
                      <div className="w-20 h-20 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center mb-2 shadow-inner group-hover:scale-105 transition-transform">
                        <User size={42} className="text-cyan-300" />
                      </div>
                      <span className="font-sans text-xs text-cyan-400 font-bold tracking-wider uppercase">
                        Executive Portrait
                      </span>
                    </div>
                  )}

                  {/* Verified Executive Badge Overlay */}
                  <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-md bg-slate-950/85 backdrop-blur border border-cyan-400/40 text-cyan-300 font-sans text-[10px] font-medium flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-cyan-400" /> Verified
                  </div>
                </div>
              </div>

              {/* Bio & Location Details */}
              <div className="space-y-3 pt-1">
                <div>
                  <h2 className="font-display font-bold text-white text-xl">
                    {config.ownerName}
                  </h2>
                  <p className="font-sans text-xs text-slate-300 font-medium mt-1 flex items-center justify-center gap-1.5">
                    <MapPin size={13} className="text-cyan-400" />
                    <span>{config.ownerLocation || 'Bekasi, West Java, Indonesia'}</span>
                  </p>
                </div>

                <div className="bg-slate-900/70 border border-slate-700/60 rounded-xl p-3.5 text-left space-y-2.5 text-xs font-sans">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Award size={14} className="text-cyan-400" /> Core Domain:
                    </span>
                    <span className="text-cyan-300 font-semibold">AI, Mobile & Web</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Globe2 size={14} className="text-cyan-400" /> Availability:
                    </span>
                    <span className="text-emerald-300 font-semibold">Remote Worldwide</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Mail size={14} className="text-cyan-400" /> Response:
                    </span>
                    <span className="text-slate-200 font-medium">&lt; 24h SLA</span>
                  </div>
                </div>

                {/* Social Links & Direct Mail */}
                <div className="flex items-center justify-center gap-2 pt-1.5">
                  <a
                    href={`mailto:${config.ownerEmail}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 font-sans text-xs font-medium text-slate-200 bg-slate-800/80 border border-slate-700/60 rounded-lg hover:border-cyan-400 hover:text-cyan-300 transition-colors"
                    title="Send Email"
                  >
                    <Mail size={13} className="text-cyan-400" />
                    <span>Email Direct</span>
                  </a>

                  {config.ownerGithub && (
                    <a
                      href={config.ownerGithub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-300 bg-slate-800/80 border border-slate-700/60 rounded-lg hover:text-white hover:border-cyan-400 transition-colors"
                      title="GitHub"
                    >
                      <Github size={15} />
                    </a>
                  )}

                  {config.ownerLinkedIn && (
                    <a
                      href={config.ownerLinkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-300 bg-slate-800/80 border border-slate-700/60 rounded-lg hover:text-white hover:border-cyan-400 transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin size={15} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-6">
          <motion.button
            onClick={() => scrollToSection('about')}
            aria-label="Scroll to About section"
            className="text-slate-400 hover:text-cyan-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 rounded-full"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={22} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default TerminalCard;





import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, MapPin, Copy, Check, Clock,
  Send, Sparkles, ArrowRight,
  ShieldCheck, MessageSquare
} from 'lucide-react';
import type { SystemConfig } from '../types';

interface ContactSectionProps {
  config: SystemConfig;
}

const PROJECT_TYPES = [
  'Enterprise AI Automation (n8n/Langflow)',
  'Autonomous Multi-Agents & RAG Engine',
  'Mobile Application (Flutter / Dart)',
  'Enterprise Full-Stack SaaS (Laravel/React)',
  'Principal / Lead Engineering Role',
  'Technical Architecture Advisory',
];

const TIMELINE_OPTIONS = [
  'Immediate (< 2 Weeks)',
  'Within 1 Month',
  'Flexible / Ongoing Contract',
  'Full-Time / Lead Position',
];

const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: PROJECT_TYPES[0],
    timeline: TIMELINE_OPTIONS[0],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.ownerEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Construct pre-filled email mailto draft
    const subject = encodeURIComponent(`[Project Inquiry] ${formData.projectType} — ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Bramastyo,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nEstimated Timeline: ${formData.timeline}\n\nProject Scope / Inquiry:\n${formData.message}\n\nLooking forward to hearing from you!`
    );
    
    setTimeout(() => {
      window.location.href = `mailto:${config.ownerEmail}?subject=${subject}&body=${body}`;
    }, 800);
  };

  return (
    <section id="contact" aria-label="Contact & Engagement" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-sans text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles size={13} className="text-cyan-400" />
            <span>Direct Strategic Partnership & Hiring</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Something Exceptional
          </h2>
          <p className="text-slate-300 font-sans text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Available for Senior / Principal Engineering roles, enterprise AI automation pipelines, autonomous agent systems, and mission-critical SaaS contracts.
          </p>
        </motion.div>

        {/* 2-Column Executive Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Communication Channels & Availability */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-5 space-y-5"
          >
            {/* Direct Channel Glass Card */}
            <div className="glass-panel p-6 sm:p-7 border border-cyan-500/30 rounded-2xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 left-0 h-24 bg-gradient-to-b from-cyan-500/20 via-sky-500/10 to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div>
                  <span className="font-sans text-[11px] font-bold tracking-wider px-2.5 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 uppercase">
                    Direct Executive Inbox
                  </span>
                  <p className="font-sans text-xs text-slate-300 mt-2">
                    Direct line for technical leadership, contracts, and strategic opportunities:
                  </p>
                  <p className="font-sans text-lg sm:text-xl font-bold text-white mt-1 break-all select-all">
                    {config.ownerEmail}
                  </p>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <a
                    href={`mailto:${config.ownerEmail}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-sans text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_18px_rgba(56,189,248,0.35)] cursor-pointer"
                  >
                    <Mail size={15} />
                    <span>Send Direct Email</span>
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-semibold text-slate-200 bg-slate-900/90 border border-slate-700/70 hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copied ? 'Email Copied!' : 'Copy Address'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Engagement Standards & SLA Card */}
            <div className="glass-panel p-6 border border-slate-700/60 rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-cyan-400" />
                </div>
                <div>
                  <p className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-wider">Base Location & Timezone</p>
                  <p className="font-sans text-sm font-semibold text-slate-100 mt-0.5">{config.ownerLocation}</p>
                  <p className="font-sans text-xs text-slate-300">Available for Global Remote (UTC+7 / Sync across US, EU & APAC)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-emerald-400" />
                </div>
                <div>
                  <p className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-wider">Response Guarantee SLA</p>
                  <p className="font-sans text-sm font-semibold text-slate-100 mt-0.5">&lt; 12 – 24 Hours Response Time</p>
                  <p className="font-sans text-xs text-slate-300">Direct response from Principal Engineer</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} className="text-purple-400" />
                </div>
                <div>
                  <p className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-wider">Engagement Types</p>
                  <p className="font-sans text-sm font-semibold text-slate-100 mt-0.5">Full-Time / Lead / Strategic Contract</p>
                  <p className="font-sans text-xs text-slate-300">NDA Protected · Direct C-Level / Tech Lead Reporting</p>
                </div>
              </div>
            </div>

            {/* Active Status Badge */}
            <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 flex items-center gap-3 shadow-lg">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <p className="font-sans text-xs font-semibold text-emerald-200">
                Currently open for high-impact engineering projects and leadership roles.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interactive Project Inquiry / Proposal Form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel p-6 sm:p-8 border border-slate-700/80 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-700/60">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">
                    Submit Project Inquiry
                  </h3>
                  <p className="font-sans text-xs text-slate-300 mt-1">
                    Fill in your project scope for an immediate architecture proposal.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center">
                  <MessageSquare size={18} className="text-cyan-300" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs font-semibold text-slate-300">
                      Your Name / Organization <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Vance, CTO"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-slate-100 placeholder-slate-500 font-sans text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>

                  {/* Work Email */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs font-semibold text-slate-300">
                      Work Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-slate-100 placeholder-slate-500 font-sans text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                </div>

                {/* Primary Scope */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs font-semibold text-slate-300">
                    Primary Domain / Architecture Scope
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-slate-100 font-sans text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all cursor-pointer"
                  >
                    {PROJECT_TYPES.map(pt => (
                      <option key={pt} value={pt} className="bg-slate-900 text-slate-100">
                        {pt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timeline */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs font-semibold text-slate-300">
                    Estimated Timeline / Start Date
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-slate-100 font-sans text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all cursor-pointer"
                  >
                    {TIMELINE_OPTIONS.map(to => (
                      <option key={to} value={to} className="bg-slate-900 text-slate-100">
                        {to}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Description */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs font-semibold text-slate-300">
                    Brief Project Overview & Goals <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe key requirements, existing stack, and expected deliverables..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-slate-100 placeholder-slate-500 font-sans text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl font-sans text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    {submitted ? (
                      <>
                        <Check size={16} className="text-white" />
                        <span>Opening Mail Client...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        <span>Submit Inquiry & Launch Direct Proposal</span>
                        <ArrowRight size={16} className="text-cyan-200 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] font-sans text-slate-400 mt-2.5">
                    Guaranteed response within 12–24 business hours. No spam, strict confidentiality.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;



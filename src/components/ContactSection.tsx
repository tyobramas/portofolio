import React, { useState } from 'react';
import { Mail, MapPin, Copy, Check, Send, ArrowRight, ShieldCheck } from 'lucide-react';
import Reveal from './Reveal';
import type { SystemConfig } from '../types';

export default function ContactSection({ config }: { config: SystemConfig }) {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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

    const subject = encodeURIComponent(`[Inquiry] ${formData.subject || 'Project Discussion'} — ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Tyo Bramas,\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}\n\nBest regards.`
    );

    setTimeout(() => {
      window.location.href = `mailto:${config.ownerEmail}?subject=${subject}&body=${body}`;
    }, 500);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 relative">
      <div className="mx-auto max-w-shell px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <Reveal>
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold-400">
              CONTACT
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Get In Touch
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <div className="card-dark p-6 sm:p-8 space-y-6 border-[#232736]">
                <div>
                  <h3 className="font-sans text-lg font-bold text-white mb-2">
                    Executive Direct Line
                  </h3>
                  <p className="font-mono text-sm sm:text-base text-gold-300 break-all select-all font-semibold">
                    {config.ownerEmail}
                  </p>
                  <div className="mt-4 flex gap-3">
                    <a
                      href={`mailto:${config.ownerEmail}`}
                      className="btn-gold inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider text-canvas"
                    >
                      <Mail size={14} /> Send Email
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="btn-dark-outline inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="border-t border-[#232736] pt-5 space-y-4 text-xs sm:text-sm text-ink-300">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Location & Timezone</p>
                      <p className="text-ink-400">{config.ownerLocation} (UTC+7)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck size={18} className="text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Non-Disclosure & Security</p>
                      <p className="text-ink-400">All technical project requirements remain strictly confidential.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <Reveal delay={60}>
              <div className="card-dark p-6 sm:p-8 border-[#232736]">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink-300 mb-1.5">
                        Your Name <span className="text-gold-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Pratama"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-lg border border-[#262A38] bg-[#0E1017] px-4 py-3 text-sm text-white placeholder:text-ink-500 focus:border-gold-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink-300 mb-1.5">
                        Your Email <span className="text-gold-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-lg border border-[#262A38] bg-[#0E1017] px-4 py-3 text-sm text-white placeholder:text-ink-500 focus:border-gold-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Flutter Mobile Architecture / AI Agent Consultation"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-lg border border-[#262A38] bg-[#0E1017] px-4 py-3 text-sm text-white placeholder:text-ink-500 focus:border-gold-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-300 mb-1.5">
                      Your Message <span className="text-gold-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell me about your project scope, timeline, and goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-lg border border-[#262A38] bg-[#0E1017] px-4 py-3 text-sm text-white placeholder:text-ink-500 focus:border-gold-500 focus:outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-gold inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-canvas cursor-pointer shadow-gold-glow"
                    >
                      {submitted ? (
                        <>
                          <Check size={16} /> Opening Email Client...
                        </>
                      ) : (
                        <>
                          <Send size={16} /> Send Message <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}


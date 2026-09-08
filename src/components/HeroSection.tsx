import { Github, Linkedin, Mail, Globe, Download, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import TechAvatarHud from './TechAvatarHud';
import { downloadCvPdf } from '../utils/generateCvPdf';
import type { SystemConfig } from '../types';

interface HeroSectionProps {
  config: SystemConfig;
}

export default function HeroSection({ config }: HeroSectionProps) {
  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-8 pb-12 lg:pt-12 lg:pb-16 overflow-hidden">
      {/* Cinematic ambient background glow */}
      <div className="absolute top-10 right-1/4 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 h-[400px] w-[400px] rounded-full bg-amber-600/5 blur-[120px] pointer-events-none" />

      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          {/* Left Column: Intro text, Title, Bio, and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left relative z-20">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E5A93C] animate-pulse" />
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold-accent">
                  Hello, I'm
                </span>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="font-latin text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-normal tracking-wide text-white leading-[1.25] drop-shadow-[0_4px_25px_rgba(229,169,60,0.35)]">
                {config.ownerName || 'Bramastyo Kusumo'}
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="font-sans text-lg sm:text-xl font-semibold text-gold-light/80 tracking-normal">
                {config.ownerSubtitle ||
                  'Senior Full-Stack Engineer · Mobile · AI · 13+ Years in Production'}
              </h2>
            </Reveal>

            <Reveal delay={150}>
              <p className="font-sans text-xl sm:text-2xl font-bold text-gold-light tracking-normal">
                {config.ownerTitle ||
                  'We Build Solutions'}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p className="max-w-prose text-ink-300 text-sm sm:text-base leading-relaxed font-normal">
                {config.ownerBio ||
                  'Since 2013, I have been building software that solves real business problems — from inventory systems processing tens of thousands of daily transactions, to AI platforms that cut corporate recruitment cycles by 75%.'}
              </p>
            </Reveal>

            {/* JavaScript Tech Stack Badges */}
            <Reveal delay={210}>
              <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
                {[
                  'Laravel · PHP',
                  'Flutter · Dart',
                  'React · Next.js',
                  'Node.js · TypeScript',
                  'AI · LLM · LangChain',
                  'Three.js · WebGL',
                ].map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[#12141C]/90 border border-gold-500/30 text-gold-light hover:border-gold-400 hover:text-white transition-all shadow-sm cursor-default"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold-400" />
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Action Buttons */}
            <Reveal delay={240}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => handleScrollTo('#projects')}
                  className="btn-gold btn-gold-shimmer inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-canvas shadow-gold-glow cursor-pointer group"
                >
                  VIEW MY WORK <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => downloadCvPdf()}
                  className="btn-dark-outline inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-ink-100 hover:border-gold-400 hover:text-white transition-colors cursor-pointer"
                  title="Download Official Curriculum Vitae (PDF)"
                >
                  DOWNLOAD CV <Download size={15} className="text-gold-accent" />
                </button>
              </div>
            </Reveal>

            {/* Social Icons */}
            <Reveal delay={300}>
              <div className="flex items-center gap-3 pt-4">
                {config.ownerGithub && (
                  <a
                    href={config.ownerGithub}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub Profile"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#262A38] bg-[#12141C] text-ink-300 hover:border-gold-500 hover:text-gold-accent hover:scale-110 transition-all shadow-sm"
                  >
                    <Github size={18} />
                  </a>
                )}
                {config.ownerLinkedIn && (
                  <a
                    href={config.ownerLinkedIn}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn Profile"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#262A38] bg-[#12141C] text-ink-300 hover:border-gold-500 hover:text-gold-accent hover:scale-110 transition-all shadow-sm"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {config.ownerEmail && (
                  <a
                    href={`mailto:${config.ownerEmail}`}
                    aria-label="Email Contact"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#262A38] bg-[#12141C] text-ink-300 hover:border-gold-500 hover:text-gold-accent hover:scale-110 transition-all shadow-sm"
                  >
                    <Mail size={18} />
                  </a>
                )}
                <a
                  href="https://github.com/bramastyokusumo"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Website"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#262A38] bg-[#12141C] text-ink-300 hover:border-gold-500 hover:text-gold-accent hover:scale-110 transition-all shadow-sm"
                >
                  <Globe size={18} />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: High-Tech Golden HUD Portrait with Parallax Depth */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <Reveal delay={100}>
              <TechAvatarHud
                imageSrc="/images/profile-hud.png"
                alt={config.ownerName || 'Bramastyo Kusumo'}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

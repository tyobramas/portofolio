import { Github, Linkedin, Mail, Globe, Download, ArrowRight, Award, Zap } from 'lucide-react';
import Reveal from './Reveal';
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
    <section id="home" className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      {/* Cinematic ambient background glow */}
      <div className="absolute top-10 right-1/4 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 h-[400px] w-[400px] rounded-full bg-amber-600/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-shell px-6 lg:px-10">
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
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                {config.ownerName || 'Tyo Bramas'}
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-gold-light tracking-normal">
                {config.ownerTitle || 'Principal Software Engineer'}
              </h2>
            </Reveal>

            <Reveal delay={180}>
              <p className="max-w-xl text-ink-300 text-sm sm:text-base leading-relaxed font-normal">
                {config.ownerBio ||
                  'I architect and engineer high-concurrency mobile platforms (Flutter), distributed cloud backends, and autonomous AI automation pipelines with enterprise reliability.'}
              </p>
            </Reveal>

            {/* Action Buttons */}
            <Reveal delay={240}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => handleScrollTo('#projects')}
                  className="btn-gold inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-canvas shadow-gold-glow cursor-pointer"
                >
                  VIEW MY WORK <ArrowRight size={15} />
                </button>

                <a
                  href={`mailto:${config.ownerEmail || 'bramastyodevops@gmail.com'}?subject=Inquiry%20CV%20and%20Consultation`}
                  className="btn-dark-outline inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-ink-100 cursor-pointer"
                >
                  DOWNLOAD CV <Download size={15} className="text-gold-accent" />
                </a>
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
                  href="https://github.com/tyobramas"
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

          {/* Right Column: Prestigious Portrait with Radiant Golden Halo Ring & 3D Depth */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <Reveal delay={100}>
              <div className="relative flex items-center justify-center">
                {/* 1. Outer Astronomical Hairline Ring */}
                <div className="absolute h-[410px] w-[410px] sm:h-[470px] sm:w-[470px] lg:h-[500px] lg:w-[500px] rounded-full border border-gold-500/25 pointer-events-none animate-pulse" />

                {/* 2. Radiant Golden Halo Ring Frame */}
                <div className="absolute h-[380px] w-[380px] sm:h-[430px] sm:w-[430px] lg:h-[460px] lg:w-[460px] rounded-full border-[3px] border-[#F5C869] shadow-[0_0_50px_10px_rgba(229,169,60,0.45),0_0_100px_25px_rgba(229,169,60,0.2),inset_0_0_35px_rgba(229,169,60,0.25)] pointer-events-none z-10" />

                {/* 3. Warm Ambient Gold Radial Aura behind */}
                <div className="absolute h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-amber-400/25 blur-3xl pointer-events-none" />

                {/* 4. The Developer Portrait (Close-Up, Sharp, Seamless Fit) */}
                <div className="relative z-0 h-[374px] w-[374px] sm:h-[424px] sm:w-[424px] lg:h-[454px] lg:w-[454px] overflow-hidden rounded-full bg-[#050608] shadow-2xl group">
                  <img
                    src="/images/developer_portrait_closeup.jpg"
                    alt={config.ownerName || 'Tyo Bramas'}
                    className="h-full w-full object-cover object-center scale-[1.02] group-hover:scale-108 transition-transform duration-700 select-none"
                  />
                  {/* Subtle inner ambient gold rim overlay */}
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-gold-400/30 pointer-events-none" />
                </div>

                {/* 5. Floating Luxury Plaque: 13+ Years (Bottom Left) */}
                <div className="absolute -bottom-3 -left-4 sm:-left-8 z-20 inline-flex items-center gap-2.5 rounded-xl border border-gold-500/40 bg-[#0B0C10]/95 backdrop-blur-md px-4 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(229,169,60,0.2)] hover:border-gold-400 transition-colors">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold-500/20 text-gold-accent">
                    <Award size={16} />
                  </div>
                  <div>
                    <p className="font-sans text-xs font-extrabold text-white leading-none">
                      13+ Years
                    </p>
                    <p className="font-sans text-[0.625rem] font-semibold text-gold-accent uppercase tracking-wider mt-0.5">
                      Production Engineering
                    </p>
                  </div>
                </div>

                {/* 6. Floating Luxury Plaque: 40+ Enterprise (Top Right) */}
                <div className="absolute -top-3 -right-2 sm:-right-8 z-20 inline-flex items-center gap-2.5 rounded-xl border border-gold-500/40 bg-[#0B0C10]/95 backdrop-blur-md px-4 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(229,169,60,0.2)] hover:border-gold-400 transition-colors">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold-500/20 text-gold-accent">
                    <Zap size={16} />
                  </div>
                  <div>
                    <p className="font-sans text-xs font-extrabold text-white leading-none">
                      40+ Enterprise
                    </p>
                    <p className="font-sans text-[0.625rem] font-semibold text-gold-accent uppercase tracking-wider mt-0.5">
                      Platforms Deployed
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

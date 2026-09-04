import { ArrowUp, Code2, Search, Zap, Smartphone, Globe } from 'lucide-react';
import Reveal from './Reveal';

interface FooterProps {
  ownerName?: string;
}

const BADGES = [
  { icon: <Code2 className="h-4 w-4 text-gold-400" />, label: 'CLEAN CODE' },
  { icon: <Search className="h-4 w-4 text-gold-400" />, label: 'SEO FRIENDLY' },
  { icon: <Zap className="h-4 w-4 text-gold-400" />, label: 'FAST LOADING' },
  { icon: <Smartphone className="h-4 w-4 text-gold-400" />, label: 'FULLY RESPONSIVE' },
  { icon: <Globe className="h-4 w-4 text-gold-400" />, label: 'CROSS BROWSER COMPATIBLE' },
];

export default function Footer({ ownerName = 'Tyo Bramas' }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#1C202C] bg-[#07080B] pt-14 pb-8 text-ink-300">
      <div className="mx-auto max-w-shell px-6 lg:px-10">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-[#1A1D28]">
          {/* Logo & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
            <span className="font-sans text-xl font-extrabold text-white">
              {ownerName || 'TyoBramas'}<span className="text-gold-500">.</span>
            </span>
            <span className="text-xs text-ink-500">
              &copy; {new Date().getFullYear()} {ownerName}. All Rights Reserved.
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold uppercase tracking-wider text-ink-400">
            <button onClick={() => scrollTo('#home')} className="hover:text-gold-400 transition-colors">
              HOME
            </button>
            <button onClick={() => scrollTo('#about')} className="hover:text-gold-400 transition-colors">
              ABOUT
            </button>
            <button onClick={() => scrollTo('#services')} className="hover:text-gold-400 transition-colors">
              SERVICES
            </button>
            <button onClick={() => scrollTo('#projects')} className="hover:text-gold-400 transition-colors">
              PORTFOLIO
            </button>
            <button onClick={() => scrollTo('#experience')} className="hover:text-gold-400 transition-colors">
              EXPERIENCE
            </button>
            <button onClick={() => scrollTo('#contact')} className="hover:text-gold-400 transition-colors">
              CONTACT
            </button>
          </div>

          {/* Scroll To Top Button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#262A38] bg-[#12141C] text-gold-400 hover:border-gold-400 hover:bg-gold-500 hover:text-canvas transition-all shadow-md"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Bottom Feature Pill Bar */}
        <Reveal delay={100}>
          <div className="pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {BADGES.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-widest text-ink-400 hover:text-gold-300 transition-colors"
              >
                {b.icon}
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

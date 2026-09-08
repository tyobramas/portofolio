import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Download } from 'lucide-react';
import { downloadCvPdf } from '../utils/generateCvPdf';

interface TopBarProps {
  onAdminClick?: () => void;
  onOpenScraper?: () => void;
}

const NAV_ITEMS = [
  { href: '#home', label: 'HOME' },
  { href: '#about', label: 'ABOUT' },
  { href: '#services', label: 'SERVICES' },
  { href: '#projects', label: 'PORTFOLIO' },
  { href: '#experience', label: 'EXPERIENCE' },
  { href: '#certificates', label: 'CERTIFICATES' },
  { href: '#contact', label: 'CONTACT' },
];

export default function TopBar({ onAdminClick, onOpenScraper: _onOpenScraper }: TopBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const clickCountRef = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(Math.max(progress, 0), 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    clickCountRef.current += 1;
    if (clickCountRef.current >= 3) {
      if (onAdminClick) onAdminClick();
      clickCountRef.current = 0;
      return;
    }
    setTimeout(() => {
      clickCountRef.current = 0;
    }, 1000);
  };

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#1E2230] bg-[#0B0C10]/95 backdrop-blur-md transition-colors relative">
      <div className="shell flex h-20 items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={handleLogoClick}
          title="Klik 3x untuk konsol admin"
          className="flex items-center gap-1.5 text-left focus:outline-none group cursor-pointer"
        >
          <span className="font-sans text-2xl font-extrabold tracking-tight text-white group-hover:text-gold-400 transition-colors">
            bramastyo<span className="text-gold-500">.</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav aria-label="Navigasi Utama" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="font-sans text-xs font-semibold tracking-wider text-ink-300 transition-colors duration-150 hover:text-gold-400 focus:outline-none cursor-pointer"
            >
              {item.label}
            </button>
          ))}

          {/* SCRAPER link hidden from public nav — access via /tools/linkedin directly */}

          {/* Quick CV Download Button */}
          <button
            onClick={() => downloadCvPdf()}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-bold text-gold-300 hover:text-white border border-gold-500/30 hover:border-gold-400 rounded-lg bg-[#141722] transition-colors cursor-pointer"
            title="Download Official Curriculum Vitae (PDF)"
          >
            <Download size={13} className="text-gold-accent" />
            <span>CV</span>
          </button>

          {/* LET'S TALK button with liquid gold shimmer */}
          <button
            onClick={() => handleNavClick('#contact')}
            className="btn-gold btn-gold-shimmer ml-1 inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-canvas shadow-gold-glow cursor-pointer group"
          >
            LET'S TALK <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden gap-3">
          <button
            onClick={() => handleNavClick('#contact')}
            className="btn-gold btn-gold-shimmer rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-canvas"
          >
            LET'S TALK
          </button>
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            className="p-2 text-ink-200 hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Top Hairline Scroll Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1A1D28]/60 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#E5A93C] via-[#F5C869] to-[#FFF1C5] shadow-[0_0_10px_rgba(229,169,60,0.9)] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#1E2230] bg-[#0E1017] px-6 py-5 shadow-2xl md:hidden">
          <nav className="flex flex-col space-y-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-left font-sans text-sm font-semibold tracking-wider text-ink-200 hover:text-gold-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
            {/* SCRAPER hidden from public mobile nav */}
          </nav>
        </div>
      )}
    </header>
  );
}

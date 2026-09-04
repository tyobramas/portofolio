import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

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
  { href: '#contact', label: 'CONTACT' },
];

export default function TopBar({ onAdminClick, onOpenScraper }: TopBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const clickCountRef = React.useRef(0);

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
    <header className="sticky top-0 z-50 border-b border-[#1E2230] bg-[#0B0C10]/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-20 max-w-shell items-center justify-between px-6 lg:px-10">
        {/* Brand Logo */}
        <button
          onClick={handleLogoClick}
          title="Klik 3x untuk konsol admin"
          className="flex items-center gap-1.5 text-left focus:outline-none group"
        >
          <span className="font-sans text-2xl font-extrabold tracking-tight text-white group-hover:text-gold-400 transition-colors">
            TyoBramas<span className="text-gold-500">.</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav aria-label="Navigasi Utama" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="font-sans text-xs font-semibold tracking-wider text-ink-300 transition-colors duration-150 hover:text-gold-400 focus:outline-none"
            >
              {item.label}
            </button>
          ))}

          {onOpenScraper && (
            <button
              onClick={onOpenScraper}
              className="font-sans text-xs font-semibold tracking-wider text-ink-400 hover:text-gold-400 transition-colors border-l border-[#232736] pl-6"
            >
              SCRAPER
            </button>
          )}

          {/* LET'S TALK button */}
          <button
            onClick={() => handleNavClick('#contact')}
            className="btn-gold ml-2 inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-canvas shadow-gold-glow"
          >
            LET'S TALK <ArrowRight size={14} />
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden gap-3">
          <button
            onClick={() => handleNavClick('#contact')}
            className="btn-gold rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-canvas"
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
            {onOpenScraper && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenScraper();
                }}
                className="pt-3 text-left font-sans text-sm font-semibold tracking-wider text-gold-400 border-t border-[#232736]"
              >
                SCRAPER TOOLS
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

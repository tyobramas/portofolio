import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface TopBarProps {
  onAdminClick?: () => void;
  onOpenScraper?: () => void;
}

const NAV_ITEMS = [
  { href: '#about', label: 'Ringkasan' },
  { href: '#experience', label: 'Pengalaman' },
  { href: '#projects', label: 'Proyek' },
  { href: '#skills', label: 'Keahlian' },
  { href: '#certificates', label: 'Sertifikasi' },
  { href: '#contact', label: 'Kontak' },
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
    <header className="no-print sticky top-0 z-40 border-b border-rule bg-canvas text-ink-900 transition-colors">
      <div className="shell mx-auto flex h-14 max-w-shell items-center justify-between px-6">
        {/* Monogram / Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogoClick}
            title="Klik 3x untuk konsol admin"
            className="group flex items-baseline gap-2 text-left focus-visible:outline-none"
          >
            <span className="font-display text-h3 font-bold tracking-tight text-ink-900 group-hover:text-brass-600 transition-colors">
              Tyo Bramas
            </span>
            <span className="hidden font-mono text-[0.6875rem] uppercase tracking-widest text-brass-600 sm:inline">
              / Principal Engineer
            </span>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav aria-label="Navigasi Utama" className="hidden items-center gap-6 sm:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-meta text-ink-600 transition-colors duration-150 hover:text-brass-600 focus-visible:outline-none"
            >
              {item.label}
            </button>
          ))}
          {onOpenScraper && (
            <button
              onClick={onOpenScraper}
              className="text-meta font-mono text-ink-500 hover:text-brass-600 transition-colors border-l border-rule pl-4"
            >
              Tools
            </button>
          )}
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center sm:hidden">
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            className="p-1.5 text-ink-700 hover:text-ink-900"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-rule bg-canvas px-6 py-4 shadow-lift sm:hidden">
          <nav className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-left text-meta font-medium text-ink-700 hover:text-brass-600"
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
                className="pt-2 text-left font-mono text-meta text-brass-600 border-t border-rule"
              >
                LinkedIn Scraper Tool
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

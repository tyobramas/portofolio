import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#about',        label: 'About' },
  { href: '#expertise',    label: 'Expertise' },
  { href: '#timeline',     label: 'Timeline' },
  { href: '#projects',     label: 'Projects' },
  { href: '#skills',       label: 'Skills' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact',      label: 'Contact' },
];

interface NavbarProps {
  onAdminClick: () => void;
  onOpenDashboard?: () => void;
  isDashboardActive?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onAdminClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const clicksRef = React.useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hidden admin trigger — triple-click the logo
  const handleLogoClick = () => {
    clicksRef.current += 1;
    if (clicksRef.current >= 3) {
      onAdminClick();
      clicksRef.current = 0;
      return;
    }
    setTimeout(() => { clicksRef.current = 0; }, 1200);
  };

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        role="banner"
        className={[
          'fixed top-0 left-0 right-0 z-[9900] transition-all duration-200',
          scrolled
            ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-700/60 shadow-lg'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            aria-label="Home — triple-click for admin"
            className="flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 rounded"
          >
            <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">
              <Terminal size={14} className="text-cyan-300" />
            </div>
            <span className="font-mono text-sm font-semibold text-slate-100 tracking-wide">
              BK<span className="text-cyan-400">.</span>dev
            </span>
          </button>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1.5">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-1.5 font-sans font-medium text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              className="p-2 text-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 rounded-lg transition-colors"
              onClick={() => setMobileOpen(o => !o)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            className="fixed top-14 left-0 right-0 z-[9890] bg-slate-950/95 backdrop-blur-md border-b border-slate-700/60 px-4 py-4"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="w-full text-left px-3 py-2.5 font-mono text-sm text-slate-200 hover:text-white hover:bg-slate-800/60 rounded-md transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
                >
                  <span className="text-cyan-400 mr-2">▸</span>{link.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;


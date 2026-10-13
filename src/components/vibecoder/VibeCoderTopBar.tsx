import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface VibeCoderTopBarProps {
  onAdminClick?: () => void;
  onNavigate?: (path: string) => void;
}

export default function VibeCoderTopBar({ onAdminClick, onNavigate }: VibeCoderTopBarProps) {
  const clickCountRef = useRef(0);

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

  const handleNavClick = (href: string, isRoute?: boolean) => {
    if (isRoute && onNavigate) {
      onNavigate(href);
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-zinc-900 bg-[#FAF7F2]/95 backdrop-blur-md transition-colors">
      <div className="shell flex h-14 sm:h-20 items-center justify-between gap-1.5 sm:gap-3">
        {/* 1. Brand Logo (Click 3x for Admin Console) */}
        <button
          onClick={handleLogoClick}
          title="Klik 3x untuk konsol admin"
          className="flex items-center gap-1 text-left focus:outline-none group cursor-pointer shrink-0"
        >
          <span className="font-['Zentronix','Audiowide','Michroma',sans-serif] text-base sm:text-2xl tracking-wider text-zinc-950 group-hover:text-[#065F46] transition-colors uppercase">
            bramastyo<span className="text-[#065F46]">.</span>
          </span>
        </button>

        {/* 2. Executive Status Pill (Monospace Typewriter Font with Green Radar Pulse & Blinking Terminal Cursor) */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border-2 border-zinc-900 bg-white shadow-[0_2px_0_0_#18181B] whitespace-nowrap shrink-0 sm:shrink">
          {/* Pulsing Green Radar Status Indicator */}
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500" />
          </span>

          {/* Desktop & Large Tablet Display */}
          <span className="hidden md:inline-flex items-center font-mono text-xs sm:text-[13px] font-bold text-zinc-900 tracking-tight select-none whitespace-nowrap">
            available for project and remote overseas
            <span className="terminal-cursor w-[7px] h-[13px] sm:h-[14px] ml-1.5 bg-zinc-900 align-middle" />
          </span>

          {/* Compact Tablet Display */}
          <span className="hidden sm:inline-flex md:hidden items-center font-mono text-xs font-bold text-zinc-900 tracking-tight select-none whitespace-nowrap">
            available for remote overseas
            <span className="terminal-cursor w-[6px] h-[12px] ml-1 bg-zinc-900 align-middle" />
          </span>

          {/* Mobile Display: Single clean line, strictly no wrapping, sleek & proportional */}
          <span className="inline-flex sm:hidden items-center font-mono text-[10px] font-bold text-zinc-900 tracking-tight select-none whitespace-nowrap">
            available for remote
            <span className="terminal-cursor w-[5px] h-[10px] ml-1 bg-zinc-900 align-middle" />
          </span>
        </div>

        {/* 3. Direct Contact Action Button */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => handleNavClick('#contact')}
            className="flex items-center gap-1 sm:gap-2 rounded-xl border-2 border-zinc-900 bg-[#FEE028] px-2.5 sm:px-5 py-1 sm:py-2 text-[11px] sm:text-xs font-black uppercase tracking-wider text-zinc-950 shadow-[0_2px_0_0_#18181B] sm:shadow-[0_3px_0_0_#18181B] hover:translate-y-[-1px] hover:shadow-[0_4.5px_0_0_#18181B] active:translate-y-[2px] active:shadow-[0_1px_0_0_#18181B] transition-all cursor-pointer group shrink-0"
          >
            <span className="hidden xs:inline">LET'S TALK</span>
            <span className="xs:hidden">TALK</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
}

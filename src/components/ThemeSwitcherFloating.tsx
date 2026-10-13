import { Sparkles, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcherFloating() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      aria-label="Theme selector"
      className="fixed bottom-6 right-6 z-[9999] flex items-center"
    >
      <button
        onClick={toggleTheme}
        title={
          theme === 'dark'
            ? 'Klik untuk beralih ke Tema Vibe Coder (Interactive Mechanical Keyboard)'
            : 'Klik untuk kembali ke Tema Executive Dark (Luxury Gold)'
        }
        className={`group flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-[0_6px_25px_rgba(236,72,153,0.65)] border-2 border-white/40 ring-4 ring-pink-500/25'
            : 'bg-[#FFE57F] text-zinc-950 shadow-[0_6px_0_0_#18181B,0_10px_20px_rgba(0,0,0,0.15)] border-2 border-zinc-900'
        }`}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400"></span>
        </span>
        {theme === 'dark' ? (
          <>
            <Sparkles size={15} className="text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="tracking-wide">Ganti Tema: Vibe Coder ⌨️</span>
          </>
        ) : (
          <>
            <Moon size={15} className="text-zinc-900" />
            <span className="tracking-wide">Kembali: Dark Executive 🌙</span>
          </>
        )}
      </button>
    </aside>
  );
}

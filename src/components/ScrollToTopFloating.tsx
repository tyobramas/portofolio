import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopFloating() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past 320px
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <aside
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-6 scale-90 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        title="Kembali ke atas (Scroll to top)"
        aria-label="Kembali ke atas"
        className="group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-2xl border-3 border-zinc-900 bg-[#FDE047] text-zinc-950 shadow-[0_4px_0_0_#18181B] hover:shadow-[0_6px_0_0_#18181B] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_0_#18181B] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
      >
        {/* Subtle Top Dish Keycap Highlight */}
        <span
          className="pointer-events-none absolute inset-x-1.5 top-1 h-3 rounded-t-xl bg-white/40"
          aria-hidden="true"
        />

        {/* Upward Arrow Icon */}
        <ArrowUp
          size={22}
          strokeWidth={2.75}
          className="transition-transform duration-200 group-hover:-translate-y-0.5 group-active:translate-y-0"
        />
      </button>
    </aside>
  );
}

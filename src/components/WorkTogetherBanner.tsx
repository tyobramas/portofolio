import { Send, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';

interface WorkTogetherBannerProps {
  onContactClick?: () => void;
}

export default function WorkTogetherBanner({ onContactClick }: WorkTogetherBannerProps) {
  const handleClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const el = document.querySelector('#contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 relative z-20">
      <div className="mx-auto max-w-shell px-6 lg:px-10">
        <Reveal>
          <SpotlightCard
            className="p-8 sm:p-12 border-gold-500/40 bg-gradient-to-r from-[#141722] via-[#161A28] to-[#12141C] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(229,169,60,0.15)] group"
            spotlightColor="rgba(229, 169, 60, 0.18)"
            borderColor="rgba(245, 200, 105, 0.55)"
          >
            {/* Subtle background glow */}
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              <div className="flex items-start sm:items-center gap-5">
                {/* Paper plane gold icon squircle */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold-500/15 border border-gold-500/30 text-gold-400 shadow-gold-sm group-hover:scale-110 group-hover:bg-gold-500/25 transition-all duration-300">
                  <Send className="h-6 w-6 -rotate-12 translate-x-0.5" />
                </div>

                <div>
                  <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Let's Build Something Exceptional
                  </h3>
                  <p className="mt-1 text-sm sm:text-base text-ink-300 max-w-xl leading-relaxed">
                    Have a mission-critical platform, mobile app, or AI automation project? Let's discuss system architecture and bring your vision to life with precision.
                  </p>
                </div>
              </div>

              {/* Action Button with liquid gold shimmer */}
              <div className="shrink-0">
                <button
                  onClick={handleClick}
                  className="btn-gold btn-gold-shimmer inline-flex items-center gap-2.5 rounded-lg px-8 py-4 text-xs font-bold uppercase tracking-wider text-canvas shadow-gold-glow group cursor-pointer"
                >
                  START A CONVERSATION <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}

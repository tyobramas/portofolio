import { Send, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

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
          <div className="card-dark relative overflow-hidden p-8 sm:p-12 border border-gold-500/30 bg-gradient-to-r from-[#141722] via-[#161A28] to-[#12141C] shadow-2xl">
            {/* Subtle background glow */}
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              <div className="flex items-start sm:items-center gap-5">
                {/* Paper plane gold icon circle */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold-500/15 border border-gold-500/30 text-gold-400 shadow-gold-sm">
                  <Send className="h-6 w-6 -rotate-12 translate-x-0.5" />
                </div>

                <div>
                  <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Let's Work Together!
                  </h3>
                  <p className="mt-1 text-sm sm:text-base text-ink-300 max-w-lg leading-relaxed">
                    Have a mission-critical project or enterprise platform in mind? Let's discuss architecture and build something extraordinary together.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0">
                <button
                  onClick={handleClick}
                  className="btn-gold inline-flex items-center gap-2.5 rounded-lg px-8 py-4 text-xs font-bold uppercase tracking-wider text-canvas shadow-gold-glow"
                >
                  CONTACT ME <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

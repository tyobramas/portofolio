import React from 'react';
import { Briefcase, Users, Award, Smile } from 'lucide-react';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';
import { useCountUp } from '../hooks/useCountUp';

interface StatConfig {
  icon: React.ReactNode;
  value: string;
  label: string;
  sublabel: string;
}

const STATS: StatConfig[] = [
  {
    icon: <Briefcase className="h-6 w-6 text-gold-400" />,
    value: '50+',
    label: 'PROJECTS COMPLETED',
    sublabel: 'Production Deployments',
  },
  {
    icon: <Users className="h-6 w-6 text-gold-400" />,
    value: '30+',
    label: 'HAPPY CLIENTS',
    sublabel: 'Enterprise & Startups',
  },
  {
    icon: <Award className="h-6 w-6 text-gold-400" />,
    value: '13+',
    label: 'YEARS OF EXPERIENCE',
    sublabel: 'Full Lifecycle Engineering',
  },
  {
    icon: <Smile className="h-6 w-6 text-gold-400" />,
    value: '100%',
    label: 'CLIENT SATISFACTION',
    sublabel: 'On-time & Reliable SLA',
  },
];

function StatCardItem({ stat }: { stat: StatConfig }) {
  const { displayValue, elementRef } = useCountUp(stat.value, { duration: 1800 });

  return (
    <SpotlightCard
      className="p-4 sm:p-5 text-center group relative"
      spotlightColor="rgba(229, 169, 60, 0.16)"
      borderColor="rgba(245, 200, 105, 0.45)"
    >
      <div className="flex flex-col items-center justify-center text-center h-full">
        {/* Icon Squircle */}
        <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500/15 to-gold-500/5 border border-gold-500/25 group-hover:scale-110 group-hover:bg-gold-500/20 group-hover:border-gold-400/50 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] shrink-0">
          {stat.icon}
        </div>

        {/* Animated Counter */}
        <span
          ref={elementRef}
          className="block tabular font-sans text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(229,169,60,0.25)] leading-tight"
        >
          {displayValue}
        </span>

        {/* Primary Label */}
        <div className="mt-1.5 font-sans text-[0.6875rem] sm:text-xs font-bold uppercase tracking-wider text-ink-300 group-hover:text-gold-300 transition-colors leading-tight">
          {stat.label}
        </div>

        {/* Luxury Detail Sublabel */}
        <div className="mt-1 font-sans text-[0.625rem] text-ink-400 leading-normal">
          {stat.sublabel}
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function StatsBar() {
  return (
    <section className="relative py-6 sm:py-8 z-20">
      <div className="shell">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 60}>
              <StatCardItem stat={stat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

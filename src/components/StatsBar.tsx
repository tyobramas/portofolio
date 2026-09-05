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
      className="p-6 sm:p-7 text-center group"
      spotlightColor="rgba(229, 169, 60, 0.16)"
      borderColor="rgba(245, 200, 105, 0.45)"
    >
      <div className="flex flex-col items-center justify-center text-center h-full">
        {/* Top subtle hairline glow */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Icon Squircle */}
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/25 group-hover:scale-110 group-hover:bg-gold-500/20 group-hover:border-gold-400/50 transition-all duration-300 shadow-sm shrink-0">
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
    <section className="py-8 relative z-20">
      <div className="mx-auto max-w-shell px-6 lg:px-10">
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

import React from 'react';
import { Briefcase, Users, Award, Smile } from 'lucide-react';
import Reveal from './Reveal';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  {
    icon: <Briefcase className="h-6 w-6 text-gold-400" />,
    value: '50+',
    label: 'PROJECTS COMPLETED',
  },
  {
    icon: <Users className="h-6 w-6 text-gold-400" />,
    value: '30+',
    label: 'HAPPY CLIENTS',
  },
  {
    icon: <Award className="h-6 w-6 text-gold-400" />,
    value: '13+',
    label: 'YEARS OF EXPERIENCE',
  },
  {
    icon: <Smile className="h-6 w-6 text-gold-400" />,
    value: '100%',
    label: 'CLIENT SATISFACTION',
  },
];

export default function StatsBar() {
  return (
    <section className="py-8 relative z-20">
      <div className="mx-auto max-w-shell px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 60}>
              <div className="card-dark group p-6 sm:p-7 text-center relative overflow-hidden flex flex-col items-center justify-center">
                {/* Subtle top gold accent glow on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/20 group-hover:scale-110 group-hover:bg-gold-500/20 transition-all duration-300">
                  {stat.icon}
                </div>

                {/* Counter */}
                <span className="tabular font-sans text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </span>

                {/* Label */}
                <span className="mt-1 font-sans text-[0.6875rem] sm:text-xs font-semibold uppercase tracking-wider text-ink-400 group-hover:text-ink-200 transition-colors">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

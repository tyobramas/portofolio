import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import type { Skill, SkillCategory, SkillLevel } from '../types';

interface SkillsMatrixProps {
  skills: Skill[];
}

const CATEGORIES: { value: SkillCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Skills' },
  { value: 'ai', label: 'AI & Automation' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'backend', label: 'Backend' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'database', label: 'Database' },
  { value: 'devops', label: 'DevOps' },
  { value: 'tools', label: 'Tools' },
];

const LEVEL_CONFIG: Record<SkillLevel, { label: string; color: string; badgeBg: string }> = {
  expert:     { label: 'EXPERT',     color: 'text-cyan-300',    badgeBg: 'bg-cyan-500/15 border-cyan-400/40' },
  proficient: { label: 'PROFICIENT', color: 'text-emerald-300', badgeBg: 'bg-emerald-500/15 border-emerald-400/40' },
  familiar:   { label: 'FAMILIAR',   color: 'text-slate-300',   badgeBg: 'bg-slate-700/30 border-slate-600/40' },
};

// Skill CDN Icon Component with fallback
const SkillIcon: React.FC<{ icon?: string; name: string }> = ({ icon, name }) => {
  const [imgError, setImgError] = useState(false);

  if (!icon || imgError) {
    return (
      <div className="w-5 h-5 rounded-md bg-slate-800 border border-slate-700/60 flex items-center justify-center shrink-0">
        <Code2 size={12} className="text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="w-5 h-5 rounded-md bg-slate-900/80 p-0.5 border border-slate-700/60 flex items-center justify-center shrink-0 group-hover:border-cyan-400/50 transition-colors">
      <img
        src={icon}
        alt={`${name} icon`}
        onError={() => setImgError(true)}
        className="w-3.5 h-3.5 object-contain filter brightness-110 contrast-125"
        loading="lazy"
      />
    </div>
  );
};

// Mini block progress indicator: 10 blocks total
const MiniBlockBar: React.FC<{ proficiency: number }> = ({ proficiency }) => {
  const totalBlocks = 10;
  const filledBlocks = Math.round((proficiency / 100) * totalBlocks);

  return (
    <div className="flex items-center gap-1 my-1.5" aria-hidden="true">
      {Array.from({ length: totalBlocks }).map((_, i) => {
        const isFilled = i < filledBlocks;
        return (
          <span
            key={i}
            className={[
              'h-1.5 flex-1 rounded-[1px] transition-colors',
              isFilled
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_6px_rgba(56,189,248,0.3)]'
                : 'bg-slate-800/80 border border-slate-700/40',
            ].join(' ')}
          />
        );
      })}
    </div>
  );
};

const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');

  const filtered = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" aria-label="Skills Matrix" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-mono text-cyan-400 text-xs tracking-widest mb-2">$ ./skills --matrix --all</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-100">Skills & Tech Stack</h2>
          <p className="text-slate-300 text-sm mt-2 max-w-md mx-auto">
            Verified technical proficiency across AI automation, mobile, web, and infrastructure.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-7" role="group" aria-label="Filter skills category">
          {CATEGORIES.map(c => {
            const count = c.value === 'all' ? skills.length : skills.filter(s => s.category === c.value).length;
            if (count === 0 && c.value !== 'all') return null;

            return (
              <button
                key={c.value}
                onClick={() => setActiveCategory(c.value)}
                aria-pressed={activeCategory === c.value}
                className={[
                  'px-3 py-1.5 font-mono text-xs tracking-wider rounded-lg border transition-all duration-150 flex items-center gap-1.5',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400',
                  activeCategory === c.value
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.2)] font-medium'
                    : 'bg-slate-900/50 border-slate-700/60 text-slate-300 hover:border-slate-500 hover:text-white',
                ].join(' ')}
              >
                <span>{c.label}</span>
                <span className="text-[10px] opacity-70 font-mono">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Compact Skill Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((skill, i) => {
            const lvl = LEVEL_CONFIG[skill.level];

            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: i * 0.02 }}
                className="glass-panel rounded-xl p-3.5 flex flex-col justify-between hover:border-cyan-400/40 transition-colors group"
              >
                <div>
                  {/* Top row: Official CDN Logo + Name + Level badge */}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <SkillIcon icon={skill.icon} name={skill.name} />
                      <span className="font-mono text-sm text-slate-100 font-semibold truncate group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border shrink-0 ${lvl.badgeBg} ${lvl.color} font-bold tracking-wider`}>
                      {lvl.label}
                    </span>
                  </div>

                  {/* Terminal block progress bar */}
                  <MiniBlockBar proficiency={skill.proficiency} />
                </div>

                {/* Bottom row: Experience & Percentage */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-700/50 mt-1">
                  <span>
                    <span className="text-slate-200 font-medium">{skill.years}</span> yr{skill.years !== 1 ? 's' : ''} exp
                  </span>
                  <span className="text-cyan-300 font-semibold">
                    {skill.proficiency}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsMatrix;


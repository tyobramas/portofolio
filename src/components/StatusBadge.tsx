import React from 'react';
import type { ProjectStatus } from '../types';

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

const STATUS_CONFIG: Record<ProjectStatus, { label: string; dot: string; text: string; bg: string; border: string }> = {
  live:     { label: 'LIVE',     dot: 'bg-emerald-400', text: 'text-emerald-300', bg: 'bg-emerald-900/20', border: 'border-emerald-700/40' },
  wip:      { label: 'WIP',      dot: 'bg-amber-400',   text: 'text-amber-300',   bg: 'bg-amber-900/20',   border: 'border-amber-700/40'   },
  archived: { label: 'ARCHIVED', dot: 'bg-graphite-400', text: 'text-graphite-300', bg: 'bg-graphite-800/30', border: 'border-graphite-600/30' },
  private:  { label: 'PRIVATE',  dot: 'bg-red-500',     text: 'text-red-400',     bg: 'bg-red-900/20',     border: 'border-red-700/40'     },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      role="status"
      aria-label={`Status: ${cfg.label}`}
      className={[
        'inline-flex items-center gap-1.5 px-2 py-0.5',
        'font-mono text-[10px] font-semibold tracking-widest rounded-sm',
        'border',
        cfg.text, cfg.bg, cfg.border,
        className,
      ].join(' ')}
    >
      <span className={['w-1.5 h-1.5 rounded-full', cfg.dot, status === 'live' ? 'animate-pulse' : ''].join(' ')} />
      {cfg.label}
    </span>
  );
};

export default StatusBadge;

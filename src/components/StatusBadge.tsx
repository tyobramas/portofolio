import React from 'react';
import type { ProjectStatus } from '../types';

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

const STATUS_CONFIG: Record<ProjectStatus, { label: string; dot: string; text: string; bg: string; border: string }> = {
  live:         { label: 'IN PRODUCTION', dot: 'bg-emerald-400', text: 'text-emerald-300', bg: 'bg-emerald-900/20', border: 'border-emerald-700/40' },
  'case-study': { label: 'CASE STUDY',    dot: 'bg-sky-400',     text: 'text-sky-300',     bg: 'bg-sky-900/20',     border: 'border-sky-700/40'     },
  completed:    { label: 'COMPLETED',     dot: 'bg-blue-400',    text: 'text-blue-300',    bg: 'bg-blue-900/20',    border: 'border-blue-700/40'    },
  private:      { label: 'PRIVATE',       dot: 'bg-purple-400',  text: 'text-purple-300',  bg: 'bg-purple-900/20',  border: 'border-purple-700/40'  },
  wip:          { label: 'IN PROGRESS',   dot: 'bg-amber-400',   text: 'text-amber-300',   bg: 'bg-amber-900/20',   border: 'border-amber-700/40'   },
  archived:     { label: 'ARCHIVED',      dot: 'bg-zinc-400',    text: 'text-zinc-300',    bg: 'bg-zinc-800/30',    border: 'border-zinc-600/30'    },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.live;
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

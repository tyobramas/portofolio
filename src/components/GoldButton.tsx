import React from 'react';

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
}

const GoldButton: React.FC<GoldButtonProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  icon,
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-meta gap-1.5 rounded-[3px]',
    md: 'px-4 py-2 text-meta gap-2 rounded-[3px]',
    lg: 'px-6 py-2.5 text-body gap-2.5 rounded-[3px]',
  };

  const variantClasses = {
    solid:
      'bg-ink-900 text-canvas font-semibold shadow-card hover:bg-brass-600 transition-colors duration-150',
    outline:
      'bg-transparent text-ink-900 border border-rule font-medium hover:border-brass-500 hover:text-brass-600 transition-colors',
    ghost:
      'bg-transparent text-ink-700 hover:bg-canvas-sunken hover:text-ink-900 transition-colors',
  };

  return (
    <button
      className={[
        'inline-flex items-center justify-center font-sans tracking-wide whitespace-nowrap',
        'transition-colors duration-150 shrink-0 cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        sizeClasses[size],
        variantClasses[variant],
        className,
      ].join(' ')}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default GoldButton;

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GoldButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
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
    sm: 'px-3 py-1.5 text-xs gap-1.5 rounded-lg',
    md: 'px-4.5 py-2.5 text-xs sm:text-sm gap-2 rounded-xl',
    lg: 'px-6 py-3 text-sm sm:text-base gap-2.5 rounded-xl',
  };

  const variantClasses = {
    solid: [
      'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600',
      'text-white font-semibold',
      'border border-cyan-300/40',
      'shadow-[0_0_20px_rgba(56,189,248,0.25)]',
      'hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:brightness-110',
      'active:scale-[0.98]',
    ].join(' '),
    outline: [
      'bg-slate-900/60',
      'text-cyan-300 font-medium',
      'border border-cyan-400/40',
      'hover:bg-cyan-500/10 hover:border-cyan-300 hover:text-white',
      'shadow-sm',
    ].join(' '),
    ghost: [
      'bg-transparent',
      'text-cyan-300/90',
      'border border-transparent',
      'hover:bg-slate-800/60 hover:text-white',
    ].join(' '),
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ duration: 0.15 }}
      className={[
        'relative inline-flex items-center justify-center font-sans font-semibold tracking-wide whitespace-nowrap',
        'transition-all duration-150 shrink-0',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-2',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        sizeClasses[size],
        variantClasses[variant],
        className,
      ].join(' ')}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </motion.button>
  );
};

export default GoldButton;


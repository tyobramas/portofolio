/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep teal-dark backgrounds
        obsidian: {
          50:  '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#071a26',
          900: '#041018',
          950: '#020c12',
        },
        // Soft neon cyan — primary accent
        gold: {
          50:  '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',   // main accent — soft neon cyan
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        // Soft text — cool slate
        cream: {
          50:  '#f0fdfe',
          100: '#e0f9fc',
          200: '#d0f4f8',
          300: '#b8edf5',
          400: '#94dde8',
          500: '#64c8d8',
        },
        // Neutral panels — dark steel
        graphite: {
          50:  '#f8fafb',
          100: '#eef3f5',
          200: '#d8e6ea',
          300: '#a0bdc6',
          400: '#6a90a0',
          500: '#456575',
          600: '#2a4350',
          700: '#152635',
          800: '#0b1820',
          900: '#060f16',
          950: '#030a0e',
        },
        // Neon green — secondary / code accent
        neural: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',   // neon green secondary
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      fontFamily: {
        mono:    ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'fine-grid':         `linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)`,
        'obsidian-gradient': 'linear-gradient(135deg, #020c12 0%, #04101a 50%, #020c12 100%)',
      },
      backgroundSize: {
        'grid': '28px 28px',
      },
      animation: {
        'terminal-blink': 'blink 1.2s step-end infinite',
        'fade-in':        'fadeIn 0.6s ease-out forwards',
        'slide-up':       'slideUp 0.5s ease-out forwards',
        'pulse-cyan':     'pulseCyan 3s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseCyan: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(34,211,238,0.2)' },
          '50%':      { boxShadow: '0 0 24px rgba(34,211,238,0.4)' },
        },
      },
      boxShadow: {
        'gold-sm':    '0 0 8px rgba(34,211,238,0.18)',
        'gold-md':    '0 0 18px rgba(34,211,238,0.26)',
        'gold-lg':    '0 0 36px rgba(34,211,238,0.34)',
        'green-sm':   '0 0 8px rgba(74,222,128,0.15)',
        'inner-dark': 'inset 0 2px 8px rgba(0,0,0,0.6)',
        'panel':      '0 4px 24px rgba(0,0,0,0.7), 0 1px 0 rgba(34,211,238,0.07)',
      },
    },
  },
  plugins: [],
}

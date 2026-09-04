/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#0B0C10',   // deep night obsidian
          sunken:  '#07080B',   // darkest sunken tone
          card:    '#12141C',   // primary dark card surface
          raised:  '#181B26',   // elevated surface
          border:  '#232736',   // dark border hairline
        },
        ink: {
          50:  '#FAFAFA',
          100: '#F2F4F8',  // primary titles & white text
          200: '#E1E4EA',  // secondary headers
          300: '#C2C6D2',  // body text high contrast
          400: '#949BAA',  // secondary body text
          500: '#6B7283',  // meta & muted text
          600: '#484E5F',  // border subtleties
          700: '#2F3443',
          800: '#1C202C',
          900: '#12141C',
          950: '#0B0C10',
        },
        gold: {
          50:  '#FFFBF0',
          100: '#FEF4D6',
          200: '#FDE6A3',
          300: '#FBD46E',
          400: '#F7C03E',
          500: '#E5A93C',  // signature radiant gold
          600: '#CF9129',  // hover state
          700: '#A86F19',
          800: '#7B4E0E',
          900: '#543307',
        },
        brass: {
          400: '#E5A93C',
          500: '#CF9129',
          600: '#A86F19',
        },
        rule: {
          DEFAULT: '#232736',
          strong:  '#363C50',
          light:   '#181B26',
        },
      },
      fontFamily: {
        sans:      ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display:   ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        signature: ['Caveat', 'cursive'],
        mono:      ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        meta: ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.015em' }],
        body: ['0.9375rem', { lineHeight: '1.75' }],
        lead: ['1.125rem',  { lineHeight: '1.65' }],
        h3:   ['1.25rem',   { lineHeight: '1.35' }],
        h2:   ['1.75rem',   { lineHeight: '1.2' }],
        h1:   ['2.75rem',   { lineHeight: '1.1' }],
      },
      maxWidth: {
        shell: '1200px',
        prose: '68ch',
      },
      boxShadow: {
        'gold-halo': '0 0 60px 10px rgba(229, 169, 60, 0.35), inset 0 0 25px rgba(229, 169, 60, 0.25)',
        'gold-glow': '0 6px 24px -2px rgba(229, 169, 60, 0.4)',
        'gold-sm':   '0 2px 10px rgba(229, 169, 60, 0.25)',
        'card-dark': '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'card-hover': '0 12px 32px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(229, 169, 60, 0.35)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5C869 0%, #E5A93C 50%, #D4952B 100%)',
        'gold-btn':      'linear-gradient(135deg, #E5A93C 0%, #F5C869 50%, #CF9129 100%)',
        'card-gradient': 'linear-gradient(180deg, #151824 0%, #10121A 100%)',
        'hero-glow':     'radial-gradient(circle at 75% 35%, rgba(229, 169, 60, 0.15) 0%, transparent 60%)',
      },
    },
  },
  plugins: [],
};

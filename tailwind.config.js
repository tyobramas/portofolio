/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FBFAF7',   // ivory hangat — background utama
          sunken:  '#F4F1EA',   // blok pembeda halus
          raised:  '#FFFFFF',   // kartu / panel
        },
        ink: {
          900: '#15181E',  // judul
          800: '#22262E',
          700: '#3B404A',  // body text
          600: '#585E6A',
          500: '#767C88',  // meta
          400: '#9AA0AA',  // placeholder
        },
        rule: {
          DEFAULT: '#E7E2D8',  // hairline hangat
          strong:  '#D6CFC0',
        },
        brass: {
          50:  '#FAF6EF',
          100: '#F2EADB',
          200: '#E3D5B8',
          300: '#CDB689',
          400: '#B69A63',
          500: '#9C7B45',  // aksen utama
          600: '#7F6337',  // aksen untuk teks kecil (kontras 6.3:1)
          700: '#614B2A',
        },
        status: {
          open:   '#2F6B4F',
          openBg: '#EDF3EE',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // skala terkontrol — jangan bikin ukuran baru di luar ini
        meta:    ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],  // 13px
        body:    ['0.9375rem', { lineHeight: '1.7' }],                            // 15px
        lead:    ['1.0625rem', { lineHeight: '1.65' }],                           // 17px
        h3:      ['1.125rem',  { lineHeight: '1.4',  letterSpacing: '-0.01em' }],
        h2:      ['1.625rem',  { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        h1:      ['2.375rem',  { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
      },
      spacing: {
        // hanya empat nilai ritmis yang dipakai untuk layout
        gutter: '1.5rem',
        block:  '2rem',
        section:'3rem',
      },
      maxWidth: { shell: '1180px', prose: '68ch' },
      borderRadius: { card: '3px', pill: '999px' }, // sudut hampir lurus = terasa formal
      boxShadow: {
        // bayangan netral & tipis. tidak ada warna.
        card:  '0 1px 2px rgba(21,24,30,0.04), 0 1px 1px rgba(21,24,30,0.03)',
        lift:  '0 6px 20px -8px rgba(21,24,30,0.12)',
      },
      transitionTimingFunction: { refined: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
};

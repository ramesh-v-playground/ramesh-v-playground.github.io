import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#fdf8f3',
        peach: '#ffe4d1',
        coral: '#ff7a59',         // bright — backgrounds, large display text only
        'coral-text': '#b03a08',  // darker — body text, eyebrows, links (passes WCAG AA)
        sage: '#a8c4a2',
        plum: '#6b4e71',
        ink: '#2a2a3a',
        soft: '#5a5466',          // darkened from #6b6478 for AA compliance
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        float1: 'float1 20s ease-in-out infinite',
        float2: 'float2 25s ease-in-out infinite',
        blink: 'blink 2s infinite',
        'name-slide': 'nameSlide 6s ease-out infinite',
      },
      keyframes: {
        float1: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-50px, 50px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(50px, -30px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        nameSlide: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '20%, 80%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(20px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

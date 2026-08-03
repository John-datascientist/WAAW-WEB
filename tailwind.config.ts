import type { Config } from 'tailwindcss';

// Mirrors src/theme/index.ts in the Expo app so the website and mobile app
// read as one brand.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#faf8f4',
        card: '#ffffff',
        deeper: '#f2efe9',
        tx: '#1a1228',
        mu: '#6b6478',
        ln: '#e0d9f0',
        ln2: '#c8bfe0',
        pu: '#3d1f7a',
        pu2: '#5a2eb5',
        pu3: '#7c4fd4',
        puLight: '#ede8f9',
        puXlight: '#f5f2fd',
        ch: '#c9a84c',
        ch2: '#f0d98a',
        chLight: '#fdf6e3',
        su: '#1a6e3c',
        suLight: '#f0fdf4',
        suBorder: '#bbf7d0',
        da: '#b91c1c',
        daLight: '#fef2f2',
        daBorder: '#fecaca',
        warn: '#92400e',
        warnLight: '#fefce8',
        warnBorder: '#fde68a',
      },
      fontFamily: {
        serif: ['var(--font-newsreader)', 'serif'],
        mono: ['var(--font-plex-mono)', 'monospace'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '18px',
      },
    },
  },
  plugins: [],
};

export default config;

import { withTV } from 'tailwind-variants/transformer';

/** @type {import('tailwindcss').Config} */
export default withTV({
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        full_dark: '0px 0px 50px 10px #020D18',
      },
      colors: {
        background: '#9CD1F0',
        foreground: '#E3EDF6',
        black_base: '#020100',
        black_00: '#020D1',
        black_01: '#2D2E37',
        black_02: '#020D18',
        blue_00: '#01060B',
        blue_01: '#020D16',
        blue_02: '#235789',
        blue_03: '#1b59f8',
        blue_04: '#1b59f1',
        white_base: '#FFF',
        white_base_01: '#FCF7FF',
        yellow_base: '#F1D302',
        red_base: '#ED1C24',
        grey_base: '#F0F0F0',
        grey_base_01: '#C2C2C2',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
});

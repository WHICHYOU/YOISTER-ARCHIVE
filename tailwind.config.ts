import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
import fluidType from 'tailwindcss-fluid-type';

const config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  plugins: [
    animate,
    fluidType({
      settings: {
        fontSizeMin: 0.875,
        fontSizeMax: 1.25,
      },
    }),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Space Grotesk', 'ui-sans-serif'],
      },
      colors: {
        brand: 'hsl(var(--brand-primary) / <alpha-value>)',
        surface: {
          DEFAULT: 'hsl(var(--surface-default) / <alpha-value>)',
          muted: 'hsl(var(--surface-muted) / <alpha-value>)',
          inverted: 'hsl(var(--surface-inverted) / <alpha-value>)',
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
      },
    },
  },
} satisfies Config;

export default config;

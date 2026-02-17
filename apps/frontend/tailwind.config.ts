import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#8b5cf6'
        }
      }
    }
  },
  plugins: []
} satisfies Config;

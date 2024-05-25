import type { Config } from 'tailwindcss'

export type { Config }

export default {
  darkMode: ['class'],
  content: [],
  theme: {
    container: {
      center: true,
    },
    extend: {
      container: {
        padding: {
          DEFAULT: '1rem',
        },
        screens: {
          '2xl': '1680px',
        },
      },
    },
  },
} satisfies Config

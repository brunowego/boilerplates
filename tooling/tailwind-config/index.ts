import type { Config } from 'tailwindcss'

export type { Config }

export default {
  darkMode: ['class'],
  content: [],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
  },
} satisfies Config

import type { Config } from 'tailwindcss'

export type { Config }

export default {
  darkMode: ['class'],
  content: [],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
  },
} satisfies Config

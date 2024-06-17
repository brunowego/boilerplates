import tailwindPreset, { type Config } from '@acme/ui/tailwind.config'

export default {
  presets: [tailwindPreset],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    '../../packages/ui/src/components/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          xl: '2rem',
          '2xl': '3rem',
        },
        screens: {
          xl: '1480px',
          '2xl': '1680px',
        },
      },
    },
  },
} satisfies Config

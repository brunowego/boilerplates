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
      boxShadow: {
        md: '0px 0px 5px rgba(23, 24, 24, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.15)',
      },
    },
  },
} satisfies Config

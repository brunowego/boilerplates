import tailwindPreset, { type Config } from '@acme/ui/tailwind.config'

export default {
  presets: [tailwindPreset],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    '../../packages/ui/src/components/*.{ts,tsx}',
  ],
  safelist: [
    {
      pattern: /grid-cols-\d/,
    },
    {
      pattern: /col-span-\d/,
    },
  ],
} satisfies Config

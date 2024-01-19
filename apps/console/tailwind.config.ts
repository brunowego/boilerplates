import tailwindPreset, { type Config } from '@acme/ui/tailwind.config'

export default {
  presets: [tailwindPreset],
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/app.tsx',
    '../../packages/ui/src/components/ui/*.tsx',
  ],
} satisfies Config

import tailwindPreset, { type Config } from '@acme/ui/tailwind.config'

export default {
  presets: [tailwindPreset],
  content: [
    './src/app/**/*.tsx',
    './src/components/**/*.tsx',
    '../../packages/ui/src/components/*.tsx',
  ],
} satisfies Config

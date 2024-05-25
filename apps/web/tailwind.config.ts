import tailwindPreset, { type Config } from '@acme/ui/tailwind.config'

export default {
  presets: [tailwindPreset],
  content: [
    './src/app/**/*.tsx',
    './src/components/**/*.tsx',
    '../../packages/puck/src/components/**/*.tsx',
    '../../packages/ui/src/components/**/*.tsx',
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

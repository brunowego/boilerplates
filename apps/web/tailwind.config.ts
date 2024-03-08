import tailwindPreset, { type Config } from '@acme/ui/tailwind.config'
import typographyPlugin from '@tailwindcss/typography'

export default {
  presets: [tailwindPreset],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    '../../packages/ui/src/components/ui/*.{ts,tsx}',
  ],
  plugins: [typographyPlugin],
} satisfies Config

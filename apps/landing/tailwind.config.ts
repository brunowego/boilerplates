import tailwindPreset, { type Config } from '@acme/ui/tailwind.config'

export default {
  presets: [tailwindPreset],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    '../../packages/ui/src/components/ui/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'bounce-in': {
          from: { opacity: '0', transform: 'scale3d(.3, .3, .3)' },
          '20%': { transform: 'scale3d(1.1, 1.1, 1.1)' },
          '40%': { transform: 'scale3d(.9, .9, .9)' },
          '60%': { opacity: '1', transform: 'scale3d(1.03, 1.03, 1.03)' },
          '80%': { transform: 'scale3d(.97, .97, .97)' },
          to: { opacity: '1', transform: 'scale3d(1, 1, 1)' },
        },
      },
      animation: {
        'bounce-in': 'bounce-in 1s linear',
      },
    },
  },
} satisfies Config

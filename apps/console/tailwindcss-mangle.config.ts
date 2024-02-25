import { defineConfig } from 'tailwindcss-patch'
import { resolve } from 'path'

export default defineConfig({
  patch: {
    output: {
      filename: '.tw-patch/tw-class-list.json',
      // loose: true,
      removeUniversalSelector: true,
    },
    tailwindcss: {
      config: resolve(__dirname, './tailwind.config.ts'),
    },
  },
  mangle: {
    classGenerator: {
      classPrefix: '',
    },
    // include: [
    //   './src/app/**/*.{ts,tsx}',
    //   './src/components/**/*.{ts,tsx}',
    //   '../../packages/ui/src/components/ui/*.{ts,tsx}',
    // ],
    preserveFunction: ['twMerge', 'cn'],
  },
})

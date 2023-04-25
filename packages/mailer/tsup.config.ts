import { defineConfig } from 'tsup'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['./src/index.tsx'],
  format: ['cjs'],
  minify: isProduction,
  sourcemap: !isProduction,
})

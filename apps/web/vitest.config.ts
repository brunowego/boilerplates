import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsConfigPaths(), react()],
  test: {
    include: ['./src/**/*.spec.tsx'],
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
    // coverage: {
    //   reporter: ['text', 'html'],
    // },
  },
})

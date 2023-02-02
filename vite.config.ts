import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  /**
   * @type { import('vite').UserConfig }
   */
  return {
    server: {
      host: '0.0.0.0',
      port: parseInt(process.env.VITE_PORT),
    },
    plugins: [react()],
  }
})

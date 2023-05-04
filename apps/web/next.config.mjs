import * as pkg from './package.json' assert { type: 'json' }
import withPWA from 'next-pwa'

/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  output: 'standalone',
  env: {
    VERSION: pkg.version,
  },
  serverRuntimeConfig: {
    apiURL: process.env.API_URL ?? 'http://127.0.0.1:3001',
  },
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },
}

export default withPWA({
  dest: './public',
  disable: process.env.NODE_ENV === 'development',
  reloadOnOnline: false,
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkOnly',
    },
  ],
  reloadOnOnline: false,
})(nextConfig)

import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  // options: {
  //   sourcemaps: 'development',
  // },
  transpilePackages: ['@acme/db'],
  publicRuntimeConfig: {
    apiURL: process.env.API_URL ?? 'http://127.0.0.1:3001',
  },
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
}

export default nextConfig

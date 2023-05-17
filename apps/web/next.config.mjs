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
  publicRuntimeConfig: {
    apiURL: process.env.API_URL ?? 'http://127.0.0.1:3001',
  },
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },
}

export default nextConfig

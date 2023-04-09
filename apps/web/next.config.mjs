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
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },
}

export default nextConfig

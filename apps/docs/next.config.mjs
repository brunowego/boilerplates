/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['ui'],
}

export default nextConfig

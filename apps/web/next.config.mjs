/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['@acme/ui'],
}

export default nextConfig

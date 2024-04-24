/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  transpilePackages: ['@acme/ui'],

  experimental: {
    serverComponentsExternalPackages: ['oslo'],
  },
}

export default nextConfig

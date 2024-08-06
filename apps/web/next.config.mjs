/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  transpilePackages: ['@acme/ui'],

  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['oslo', 'mongoose'],
  },
}

export default nextConfig

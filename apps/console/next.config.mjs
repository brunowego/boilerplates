/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  transpilePackages: ['@acme/ui'],

  experimental: {
    serverComponentsExternalPackages: ['@medusajs/store'],
  },
}

export default nextConfig

/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/api/:path*',
        destination: '/',
        permanent: false,
      },
    ]
  },

  transpilePackages: ['@acme/ui'],

  experimental: {
    serverComponentsExternalPackages: ['oslo'],
  },
}

export default nextConfig

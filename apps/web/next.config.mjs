/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  transpilePackages: ['@acme/ui'],

  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://thiago-bastos.my.canva.site/:path*',
      },
    ]
  },
}

export default nextConfig

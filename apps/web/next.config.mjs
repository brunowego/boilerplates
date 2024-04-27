/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Authorization,Content-Type,Date',
          },
        ],
      },
    ]
  },

  transpilePackages: ['@acme/ui'],

  experimental: {
    serverComponentsExternalPackages: ['oslo'],
  },
}

export default nextConfig

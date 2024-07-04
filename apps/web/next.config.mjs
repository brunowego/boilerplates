/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  transpilePackages: ['@acme/ui'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
    ],
  },
}

export default nextConfig

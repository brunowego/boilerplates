/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'msw/browser': false,
      }
    } else {
      config.resolve.alias = {
        ...config.resolve.alias,
        'msw/node': false,
      }
    }

    return config
  },

  transpilePackages: ['@acme/ui'],
}

export default nextConfig

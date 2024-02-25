import utwm from 'unplugin-tailwindcss-mangle/webpack'

/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  webpack: (config, { dev }) => {
    config.infrastructureLogging = {
      level: 'error',
    }

    if (!dev) {
      config.plugins.push(utwm())
    }

    return config
  },

  transpilePackages: ['@acme/ui'],
}

export default nextConfig

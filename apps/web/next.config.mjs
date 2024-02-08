/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  transpilePackages: ['@acme/ui'],

  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]],
  },
}

export default nextConfig

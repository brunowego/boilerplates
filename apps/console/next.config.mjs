import { withSentryConfig } from '@sentry/nextjs'

const isDev = process.env.NODE_ENV === 'development'

/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  transpilePackages: ['@acme/ui'],

  sentry: {
    disableServerWebpackPlugin: isDev,
    disableClientWebpackPlugin: isDev,
  },
}

const userSentryWebpackPluginOptions = {
  silent: true,
}

const sentryOptions = {
  hideSourceMaps: false,
}

export default withSentryConfig(
  nextConfig,
  userSentryWebpackPluginOptions,
  sentryOptions,
)

import { init } from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

init({
  enabled: process.env.NODE_ENV !== 'development',
  dsn: SENTRY_DSN,
})

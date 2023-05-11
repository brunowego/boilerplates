import { registerAs } from '@nestjs/config'

export default registerAs('sentry', () => ({
  dsn: process.env.SENTRY_DSN,
  debug: process.env.SENTRY_DEBUG === 'true',
  environment: process.env.NODE_ENV,
}))

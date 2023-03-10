export const APP = {
  HOST: process.env.HOST || '0.0.0.0',
  PORT: process.env.PORT || 3000,
}

export const SENTRY = {
  DSN: process.env.SENTRY_DSN,
  ENV: process.env.NODE_ENV,
}

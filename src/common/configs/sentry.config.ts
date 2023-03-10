import { registerAs } from '@nestjs/config'
import { SENTRY } from '@/common/constants/env'

export default registerAs('sentry', () => ({
  dsn: SENTRY.DSN,
  environment: SENTRY.ENV,
}))

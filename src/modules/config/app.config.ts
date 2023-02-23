import { registerAs } from '@nestjs/config'
import { APP } from '@/common/constants/env'

/**
 * Configuration for the app
 */
export default registerAs('app', () => ({
  host: APP.HOST,
  port: APP.PORT,
}))

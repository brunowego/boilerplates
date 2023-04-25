import { registerAs } from '@nestjs/config'
import { APP } from '@/common/constants/env'

export default registerAs('mailer', () => ({
  host: APP.HOST,
  port: APP.PORT,
}))

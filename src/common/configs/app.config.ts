import { registerAs } from '@nestjs/config'
import { APP } from '@/common/constants/env'

export default registerAs('app', () => ({
  host: APP.HOST,
  port: APP.PORT,
}))

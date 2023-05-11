import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 3000,
}))

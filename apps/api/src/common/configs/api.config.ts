import { registerAs } from '@nestjs/config'

export default registerAs('api', () => ({
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 3000,

  key: process.env.API_KEY,
}))

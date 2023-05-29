import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 3000,

  key: process.env.API_KEY,
}))

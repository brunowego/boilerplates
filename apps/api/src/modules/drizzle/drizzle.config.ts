import { registerAs } from '@nestjs/config'

export default registerAs('drizzle', () => ({
  databaseUrl: process.env.DATABASE_URL,
}))

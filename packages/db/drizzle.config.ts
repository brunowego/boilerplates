import type { Config } from 'drizzle-kit'

export default {
  out: './src/migrations',
  schema: './src/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config

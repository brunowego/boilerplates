import type { Config } from 'drizzle-kit'

import { env } from './src/env'

export default {
  out: './src/db/migrations',
  schema: './src/db/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config
import type { Config } from 'drizzle-kit'

import { serverEnv as senv } from './src/env'

export default {
  out: './src/db/migrations',
  schema: './src/db/schemas/*.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: senv.DATABASE_URL,
  },
} satisfies Config

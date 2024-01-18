import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from '@/db/schemas'
import { serverEnv as senv } from '@/env'

export const client = postgres(senv.DATABASE_URL)

export const db: PostgresJsDatabase<typeof schema> = drizzle(client, {
  logger: senv.NODE_ENV === 'development',
  schema,
})

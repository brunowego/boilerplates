import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from '@/db/schemas'
import { env } from '@/env'

export const client = postgres(env.DATABASE_URL)

export const db: PostgresJsDatabase<typeof schema> = drizzle(client, {
  logger: env.NODE_ENV === 'development',
  schema,
})

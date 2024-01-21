import postgres from 'postgres'
import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'

import { env } from '@/env'
import * as schema from '@/db/schemas'

export const client = postgres(env.DATABASE_URL)

export const db: PostgresJsDatabase<typeof schema> = drizzle(client, {
  logger: env.NODE_ENV === 'development',
  schema,
})

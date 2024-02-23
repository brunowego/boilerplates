import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'

import { client } from './client'
import * as schema from './schemas'
import { env } from './env'

export const db: PostgresJsDatabase<typeof schema> = drizzle(client, {
  logger: env.NODE_ENV === 'development',
  schema,
})

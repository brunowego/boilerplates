import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'

import { client } from './client'
import * as schema from './schema'
import { env } from './env'

export type Db = PostgresJsDatabase<typeof schema>

export const db: Db = drizzle(client, {
  logger: env.NODE_ENV === 'development',
  schema,
})

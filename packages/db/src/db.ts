import { drizzle } from 'drizzle-orm/postgres-js'

import client from './client'
import { env } from './env'
import * as schema from './schema'

const db = drizzle(client, {
  logger: env.NODE_ENV === 'development',
  schema,
})

export default db

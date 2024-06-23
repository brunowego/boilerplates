import type { Logger } from 'drizzle-orm/logger'
import { drizzle } from 'drizzle-orm/postgres-js'

import client from './client'
import { env } from './env'
import * as schema from './schema'

// const drizzleLogger: Logger = {
//   logQuery(query: string, params: unknown[]): void {
//     console.log('\x1b[32m%s\x1b[0m', 'drizzle:query', query, params.join(','))
//   },
// }

const db = drizzle(client, {
  // logger: env.NODE_ENV === 'development' ? drizzleLogger : false,
  logger: env.NODE_ENV === 'development',
  schema,
})

export default db

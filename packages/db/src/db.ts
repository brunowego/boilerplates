import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres'

import * as schema from './schema'
import { env } from './env'
import { client } from './client'

declare global {
  var db: NodePgDatabase<typeof schema> | undefined
}

// biome-ignore lint/suspicious/noRedeclare: to support hot reloading
let db: NodePgDatabase<typeof schema>

if (env.NODE_ENV === 'production') {
  db = drizzle(client, {
    schema,
  })
} else {
  global.db =
    global.db ??
    drizzle(client, {
      logger: env.NODE_ENV === 'development',
      schema,
    })

  db = global.db
}

export { db }

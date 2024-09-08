import { migrate } from 'drizzle-orm/postgres-js/migrator'

import db from './db'
import client from './client'

console.log('Running migrations..')

migrate(db, {
  migrationsFolder: './src/migrations',
  // migrationsTable: 'migrations',
  // migrationsSchema: 'public',
})
  .then(() => {
    console.log('✔ Migrations applied successfully!')

    process.exit(0)
  })
  .catch((e) => {
    console.log('✘ Migrations failed!')
    console.error(e)

    process.exit(1)
  })
  .finally(() => {
    client.end()
  })

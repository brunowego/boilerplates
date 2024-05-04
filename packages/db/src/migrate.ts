import { migrate } from 'drizzle-orm/node-postgres/migrator'

import { db } from './db'
import { client } from './client'

console.log('Running migrations..')

migrate(db, {
  migrationsFolder: './src/migrations',
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

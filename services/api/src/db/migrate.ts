import { migrate } from 'drizzle-orm/postgres-js/migrator'

import { client, db } from '@/db'

console.log('Running migrations..')

migrate(db, {
  migrationsFolder: './src/db/migrations',
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

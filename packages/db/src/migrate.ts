import chalk from 'chalk'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

import { client, db } from './conn'

await migrate(db, { migrationsFolder: './src/migrations' })

console.log(chalk.greenBright('Migrations applied successfully!'))

await client.end()

process.exit()

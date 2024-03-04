import { db } from './db'

import { waitListTable } from './schema'

/**
 * Reset database
 */
await db.delete(waitListTable)

console.log('✔ Database reset')

console.log('Database seeded successfully!')

process.exit()

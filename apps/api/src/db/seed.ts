import { db } from '@/db'

import { product } from './schemas'

/**
 * Reset database
 */
await db.delete(product)

console.log('✔ Database reset')

console.log('Database seeded successfully!')

process.exit()

import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core'

import { generateId } from '@acme/id'

export const productsTable = pgTable('products', {
  id: varchar('id').primaryKey().$defaultFn(generateId),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

import { createId } from '@paralleldrive/cuid2'
import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core'

export const tableNames = {
  product: 'products',
}

export const product = pgTable(tableNames.product, {
  id: varchar('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  ean: varchar('ean').notNull(),
  name: varchar('name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type Product = typeof product.$inferSelect

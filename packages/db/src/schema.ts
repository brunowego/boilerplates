import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import type { z } from 'zod'

import { generateId } from '@acme/id'

export const productsTable = pgTable('products', {
  id: varchar('id').primaryKey().$defaultFn(generateId),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const selectProductSchema = createSelectSchema(productsTable)
export const insertProductSchema = createInsertSchema(productsTable)

export type Product = z.infer<typeof selectProductSchema>
export type InsertProduct = z.infer<typeof insertProductSchema>

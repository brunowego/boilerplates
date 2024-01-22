import { createId } from '@paralleldrive/cuid2'
import { pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core'

export const tableNames = {
  product: 'products',
}

export const product = pgTable(tableNames.product, {
  id: varchar('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  title: varchar('title').notNull(),
  description: text('description').notNull(),
  category: varchar('category'),
  images: varchar('images').array(),
  brand: varchar('brand').notNull(),
  model: varchar('model'),
  dimension: varchar('dimension'),
  weight: varchar('weight'),
  ean: varchar('ean').notNull().unique(),
  upc: varchar('upc').notNull().unique(),
  gtin: varchar('gtin').unique(),
  asin: varchar('asin').unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Product = typeof product.$inferSelect

import { pgTable, varchar, timestamp, primaryKey } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { generateId } from '@acme/id'

export const productsTable = pgTable('products', {
  id: varchar('id').primaryKey().$defaultFn(generateId),
  title: varchar('title').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const productsRelations = relations(productsTable, ({ many }) => ({
  images: many(productImagesTable),
}))

export const productImagesTable = pgTable(
  'product_images',
  {
    productId: varchar('product_id')
      .notNull()
      .references(() => productsTable.id, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
    filename: varchar('filename').notNull(),
    url: varchar('url').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.productId, t.filename] }),
    }
  },
)

export const productImagesRelations = relations(
  productImagesTable,
  ({ one }) => ({
    product: one(productsTable, {
      fields: [productImagesTable.productId],
      references: [productsTable.id],
    }),
  }),
)

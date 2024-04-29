import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { productsTable } from './schema'

export const selectProductSchema = createSelectSchema(productsTable)
export const insertProductSchema = createInsertSchema(productsTable).extend({
  images: z.array(
    z.object({
      filename: z.string(),
      url: z.string(),
    }),
  ),
})

export type Product = z.infer<typeof selectProductSchema>
export type InsertProduct = z.infer<typeof insertProductSchema>

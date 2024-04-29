import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { productImagesTable, productsTable } from './schema'

export const selectProductImageSchema = createSelectSchema(productImagesTable)

export const insertProductImageSchema = createInsertSchema(productImagesTable)

export const selectProductSchema = createSelectSchema(productsTable).extend({
  images: z.array(selectProductImageSchema.pick({ filename: true, url: true })),
})

export const insertProductSchema = createInsertSchema(productsTable).extend({
  images: z.array(insertProductImageSchema.pick({ filename: true, url: true })),
})

export type Image = z.infer<typeof selectProductImageSchema>
export type InsertImage = z.infer<typeof insertProductImageSchema>
export type Product = z.infer<typeof selectProductSchema>
export type InsertProduct = z.infer<typeof insertProductSchema>

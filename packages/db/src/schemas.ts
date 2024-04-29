import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import type { z } from 'zod'

import { productsTable } from './schema'

export const selectProductSchema = createSelectSchema(productsTable)
export const insertProductSchema = createInsertSchema(productsTable)

export type Product = z.infer<typeof selectProductSchema>
export type InsertProduct = z.infer<typeof insertProductSchema>

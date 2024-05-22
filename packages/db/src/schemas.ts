import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { pagesTable } from './schema'

export const selectPageSchema = createSelectSchema(pagesTable)

export const insertPageSchema = createInsertSchema(pagesTable, {
  title: z.string().min(2).max(20),
  handle: z.string().min(2).max(20),
})

export type Page = z.infer<typeof selectPageSchema>
export type InsertPage = z.infer<typeof insertPageSchema>

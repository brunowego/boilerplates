import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { filesTable } from './schema'

export const selectFileSchema = createSelectSchema(filesTable)

export const insertFileSchema = createInsertSchema(filesTable, {
  title: z.string().min(2).max(20),
  filename: z.string().min(2).max(20),
  url: z.string().min(1),
})

export type File = z.infer<typeof selectFileSchema>
export type InsertFile = z.infer<typeof insertFileSchema>

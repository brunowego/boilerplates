import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { usersTable } from './schema'

export const selectUserSchema = createSelectSchema(usersTable).omit({
  createdAt: true,
  updatedAt: true,
})
export const insertUserSchema = createInsertSchema(usersTable, {
  fullName: z.string().min(2).max(40),
  image: z.string().optional(),
}).omit({ createdAt: true, updatedAt: true })

export type User = z.infer<typeof selectUserSchema>
export type InsertUser = z.infer<typeof insertUserSchema>

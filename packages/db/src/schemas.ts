import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { usersTable } from './schema'

export const selectUserSchema = createSelectSchema(usersTable)
export const insertUserSchema = createInsertSchema(usersTable, {
  fullName: z.string().min(2).max(40),
  email: z.string().email(),
})

export type User = z.infer<typeof selectUserSchema>
export type InsertUser = z.infer<typeof insertUserSchema>

export const signInSchema = selectUserSchema.pick({
  email: true,
})

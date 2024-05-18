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

export const signUpSchema = insertUserSchema
  .pick({
    fullName: true,
    email: true,
  })
  .extend({
    password: z.string().min(8).max(64),
  })

export const signInSchema = selectUserSchema
  .pick({
    email: true,
  })
  .extend({
    password: z.string().min(8).max(64),
  })

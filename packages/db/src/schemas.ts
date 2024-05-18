import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { usersTable, profilesTable } from './schema'

export const selectUserSchema = createSelectSchema(usersTable)
export const insertUserSchema = createInsertSchema(usersTable, {
  fullName: z.string().min(2).max(40),
  email: z.string().email(),
})

export const selectProfileSchema = createSelectSchema(profilesTable)
export const insertProfileSchema = createInsertSchema(profilesTable, {
  firstName: z.string().min(1).max(20),
  lastName: z.string().max(20).optional(),
}).omit({ userId: true, createdAt: true, updatedAt: true })

export type User = z.infer<typeof selectUserSchema>
export type InsertUser = z.infer<typeof insertUserSchema>

export type Profile = z.infer<typeof selectProfileSchema>
export type InsertProfile = z.infer<typeof insertProfileSchema>

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

export const userPasswordSchema = z.object({
  password: z.string().min(8).max(64),
})

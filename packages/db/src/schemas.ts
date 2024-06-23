import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { users, workspaces } from './schema'

export const selectUserSchema = createSelectSchema(users)
export const insertUserSchema = createInsertSchema(users, {
  fullName: z.string().min(2).max(40),
  email: z.string().email(),
})

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

export const selectWorkspaceSchema = createSelectSchema(workspaces)
export const insertWorkspaceSchema = createInsertSchema(workspaces, {
  name: z.string().min(2).max(40),
  slug: z.string().min(2).max(40),
  current: z.boolean(),
})

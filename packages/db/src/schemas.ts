import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { users } from './schema'

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

export const selectProductSchema = z.object({
  id: z.string(),
  category: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
})
export const insertProductSchema = z.object({
  name: z.string().min(2).max(40),
})

export const selectReviewSchema = z.object({
  id: z.string(),
})
export const insertReviewSchema = z.object({
  name: z.string().min(2).max(40),
})

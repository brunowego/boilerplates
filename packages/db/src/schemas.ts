import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { users } from './schema'

export const selectUserSchema = createSelectSchema(users)
export const insertUserSchema = createInsertSchema(users, {
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  username: z.string().min(2).max(20),
  email: z.string().email(),
})

const UsersQuerySchema = z.object({
  search: z.string().optional(),
})

export const getUsersQuerySchema = UsersQuerySchema.merge(
  z.object({
    sortBy: z
      .enum(['createdAt', 'firstName', 'lastName'])
      .optional()
      .default('createdAt'),
    page: z.coerce.number().optional(),
  }),
)

export const getUsersCountQuerySchema = UsersQuerySchema

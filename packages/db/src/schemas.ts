import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { usersTable } from './schema'

export const selectUserSchema = createSelectSchema(usersTable)
export const insertUserSchema = createInsertSchema(usersTable, {
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  username: z.string().min(2).max(20),
  email: z.string().email(),
})

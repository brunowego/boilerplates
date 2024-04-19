import { pgTable, varchar, timestamp, index } from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { generateId } from '@acme/id'

export const usersTable = pgTable(
  'users',
  {
    id: varchar('id').primaryKey().$defaultFn(generateId),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name').notNull(),
    username: varchar('handle').notNull().unique(),
    email: varchar('email').notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => {
    return {
      usernameIdx: index('users_username_idx').on(t.username),
      emailIdx: index('users_email_idx').on(t.email),
    }
  },
)

export const selectUserSchema = createSelectSchema(usersTable)
export const insertUserSchema = createInsertSchema(usersTable, {
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  username: z.string().min(2).max(20),
  email: z.string().email(),
})

export type User = z.infer<typeof selectUserSchema>
export type InsertUser = z.infer<typeof insertUserSchema>

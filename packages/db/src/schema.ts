import { pgTable, varchar, timestamp, index } from 'drizzle-orm/pg-core'

import { generateId } from '@acme/id'

export const usersTable = pgTable(
  'users',
  {
    id: varchar('id').primaryKey().$defaultFn(generateId),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name').notNull(),
    username: varchar('username').notNull().unique(),
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

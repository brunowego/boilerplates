import { pgTable, varchar, index } from 'drizzle-orm/pg-core'

import { id, timestamps } from './utils'

export const users = pgTable(
  'users',
  {
    ...id,
    username: varchar('handle').notNull().unique(),
    email: varchar('email').notNull().unique(),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name').notNull(),
    ...timestamps,
  },
  (t) => {
    return {
      usernameIdx: index('users_username_idx').on(t.username),
      emailIdx: index('users_email_idx').on(t.email),
    }
  },
)

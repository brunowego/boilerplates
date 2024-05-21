import { pgTable, varchar, timestamp, index } from 'drizzle-orm/pg-core'

import { generateId } from '@acme/id'

import { USER_ROLES, USER_STATUS } from './constants'

export const usersTable = pgTable(
  'users',
  {
    id: varchar('id').primaryKey().$defaultFn(generateId),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name').notNull(),
    username: varchar('username').notNull().unique(),
    email: varchar('email').unique().notNull(),
    role: varchar('role', { enum: USER_ROLES }).notNull().default('member'),
    status: varchar('status', { enum: USER_STATUS })
      .notNull()
      .default('active'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => ({
    emailIdx: index('users_email_idx').on(t.email),
  }),
)

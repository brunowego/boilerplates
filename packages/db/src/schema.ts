import { pgTable, varchar, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

import { generateId } from '@acme/id'

export const tableNames = {
  waitList: 'waitlist',
}

export const waitListTable = pgTable(
  tableNames.waitList,
  {
    id: varchar('id').primaryKey().$defaultFn(generateId),
    firstName: varchar('first_name').notNull(),
    email: varchar('email').notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => ({
    emailIdx: uniqueIndex('email_idx').on(t.email),
  }),
)

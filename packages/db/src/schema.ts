import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core'

import { generateId } from '@acme/id'

const dates = {
  createdAt: timestamp('created_at', {
    withTimezone: true,
  })
    .notNull()
    .$default(() => new Date()),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
  })
    .notNull()
    .$default(() => new Date()),
}

export const usersTable = pgTable('users', {
  id: varchar('id').primaryKey().$defaultFn(generateId),
  fullName: varchar('full_name').notNull(),
  image: varchar('image'),
  ...dates,
})

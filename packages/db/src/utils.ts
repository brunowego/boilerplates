import { varchar, timestamp } from 'drizzle-orm/pg-core'

import { generateId } from '@acme/id'

export const id = {
  id: varchar('id').primaryKey().$defaultFn(generateId),
}

export const timestamps = {
  createdAt: timestamp('created_at', {
    mode: 'date',
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
  })
    .notNull()
    .defaultNow(),
}

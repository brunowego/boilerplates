import { pgTable, varchar, json, timestamp, index } from 'drizzle-orm/pg-core'

import { generateId } from '@acme/id'

export const pagesTable = pgTable(
  'pages',
  {
    id: varchar('id').primaryKey().$defaultFn(generateId),
    title: varchar('title').notNull(),
    handle: varchar('handle').notNull().unique(), // subdomain
    // domain
    data: json('data').notNull(),
    publishData: json('data').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => ({
    handleIdx: index('pages_handle_idx').on(t.handle),
  }),
)

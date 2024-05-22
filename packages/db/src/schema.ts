import { timestamp, pgTable, varchar, index } from 'drizzle-orm/pg-core'

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

export const filesTable = pgTable(
  'files',
  {
    id: varchar('id').primaryKey().$defaultFn(generateId),
    title: varchar('title').notNull(),
    filename: varchar('filename').notNull().unique(),
    url: varchar('url').notNull(),
    ...dates,
  },
  (t) => ({
    filenameIdx: index('files_filename_idx').on(t.filename),
  }),
)

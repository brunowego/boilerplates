import { pgTable, varchar, timestamp, index } from 'drizzle-orm/pg-core'

import { generateId } from '@acme/id'

export const workspacesTable = pgTable(
  'workspaces',
  {
    id: varchar('id').primaryKey().$defaultFn(generateId),
    name: varchar('name').notNull(),
    slug: varchar('slug').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => ({
    slugIdx: index('workspaces_slug_idx').on(t.slug),
  }),
)

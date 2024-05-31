import {
  pgTable,
  varchar,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core'

import { id, timestamps } from './utils'

export const domainsTable = pgTable(
  'domains',
  {
    ...id,
    domain: varchar('domain').notNull().unique(),
    verified: boolean('verified').default(false),
    primary: boolean('primary').default(false),
    lastChecked: timestamp('last_checked', {
      mode: 'date',
    })
      .notNull()
      .defaultNow(),
    ...timestamps,
  },
  (t) => ({
    domainIdx: index('domains_domain_idx').on(t.domain),
  }),
)

import {
  pgTable,
  varchar,
  timestamp,
  index,
  integer,
  primaryKey,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm/relations'
import type { AdapterAccount } from 'next-auth/adapters'

import { id, timestamps } from './utils'

export const usersTable = pgTable(
  'users',
  {
    ...id,
    fullName: varchar('full_name').notNull(),
    email: varchar('email').notNull().unique(),
    emailVerified: timestamp('email_verified', { mode: 'date' }),
    hashedPassword: varchar('hashed_password'),
    image: varchar('image'),
    ...timestamps,
  },
  (t) => ({
    emailIdx: index('users_email_idx').on(t.email),
  }),
)

export const usersRelations = relations(usersTable, ({ many }) => ({
  accounts: many(accountsTable),
}))

export const accountsTable = pgTable(
  'accounts',
  {
    userId: varchar('user_id')
      .notNull()
      .references(() => usersTable.id, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
    type: varchar('type').$type<AdapterAccount['type']>().notNull(),
    provider: varchar('provider').notNull(),
    providerAccountId: varchar('provider_account_id').notNull(),
    refreshToken: varchar('refresh_token'),
    accessToken: varchar('access_token'),
    expiresAt: integer('expires_at'),
    tokenType: varchar('token_type'),
    scope: varchar('scope'),
    idToken: varchar('id_token'),
    ...timestamps,
  },
  (t) => ({
    userIdIdx: index().on(t.userId),
    compoundKey: primaryKey({
      columns: [t.provider, t.providerAccountId],
    }),
  }),
)

export const accountsRelations = relations(accountsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [accountsTable.userId],
    references: [usersTable.id],
  }),
}))

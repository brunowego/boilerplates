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

import { generateId } from '@acme/id'

export const usersTable = pgTable(
  'users',
  {
    id: varchar('id').primaryKey().$defaultFn(generateId),
    fullName: varchar('full_name').notNull(),
    email: varchar('email').notNull().unique(),
    emailVerified: timestamp('email_verified', { mode: 'date' }),
    hashedPassword: varchar('hashed_password'),
    image: varchar('image'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
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
    createdAt: timestamp('created_at').defaultNow().notNull(),
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

export const verificationTokensTable = pgTable(
  'verification_tokens',
  {
    identifier: varchar('identifier').notNull(),
    token: varchar('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (t) => ({
    compoundKey: primaryKey({ columns: [t.identifier, t.token] }),
  }),
)

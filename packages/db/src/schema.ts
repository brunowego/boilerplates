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

export const users = pgTable(
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

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}))

export const userAddresses = pgTable('user_addresses', {
  ...id,
  userId: varchar('user_id')
    .references(() => users.id, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
    })
    .notNull(),
  zipCode: varchar('zip_code').notNull(),
  state: varchar('state').notNull(),
  city: varchar('city').notNull(),
  neighborhood: varchar('neighborhood').notNull(),
  street: varchar('street').notNull(),
  number: varchar('number').notNull(),
  reference: varchar('reference'),
  ...timestamps,
})

export const accounts = pgTable(
  'accounts',
  {
    userId: varchar('user_id')
      .references(() => users.id, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
      })
      .notNull(),
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

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

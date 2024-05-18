import {
  pgTable,
  varchar,
  timestamp,
  boolean,
  index,
  integer,
  primaryKey,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm/relations'
import type { AdapterAccount } from 'next-auth/adapters'

import { generateId } from '@acme/id'

const dates = {
  // createdAt: timestamp('created_at').defaultNow().notNull(),
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

export const usersTable = pgTable(
  'users',
  {
    id: varchar('id').primaryKey().$defaultFn(generateId),
    fullName: varchar('full_name').notNull(),
    email: varchar('email').unique().notNull(),
    emailVerified: timestamp('email_verified', { mode: 'date' }),
    hashedPassword: varchar('hashed_password'),
    image: varchar('image'),
    onboarded: boolean('onboarded').$default(() => false),
    ...dates,
  },
  (t) => ({
    emailIdx: index('users_email_idx').on(t.email),
  }),
)

export const usersRelations = relations(usersTable, ({ many, one }) => ({
  accounts: many(accountsTable),
  profile: one(profilesTable, {
    fields: [usersTable.id],
    references: [profilesTable.userId],
  }),
}))

export const accountsTable = pgTable(
  'accounts',
  {
    userId: varchar('user_id')
      .references(() => usersTable.id, {
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
    sessionState: varchar('session_state'),
    ...dates,
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

export const profilesTable = pgTable('profiles', {
  userId: varchar('user_id')
    .references(() => usersTable.id, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
    })
    .unique()
    .notNull()
    .primaryKey(),
  firstName: varchar('first_name').notNull(),
  lastName: varchar('last_name'),
  ...dates,
})

export const profilesRelations = relations(profilesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [profilesTable.userId],
    references: [usersTable.id],
  }),
}))

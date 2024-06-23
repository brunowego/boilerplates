import {
  pgTable,
  varchar,
  timestamp,
  index,
  integer,
  primaryKey,
  boolean,
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
  workspaces: many(memberships),
}))

export const accounts = pgTable(
  'accounts',
  {
    userId: varchar('user_id')
      .notNull()
      .references(() => users.id, {
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

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

export const workspaces = pgTable(
  'workspaces',
  {
    ...id,
    name: varchar('name').notNull(),
    slug: varchar('slug').unique().notNull(),
    current: boolean('current').default(false),
    ...timestamps,
  },
  (t) => ({
    slugIdx: index('workspaces_slug_idx').on(t.slug),
  }),
)

export const workspacesRelations = relations(workspaces, ({ many }) => ({
  users: many(memberships),
}))

export const memberships = pgTable('memberships', {
  userId: varchar('user_id')
    .references(() => users.id, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
    })
    .notNull(),
  workspaceId: varchar('workspace_id')
    .references(() => workspaces.id, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
    })
    .notNull(),
  ...timestamps,
})

export const membershipsRelations = relations(memberships, ({ one }) => ({
  user: one(users, {
    fields: [memberships.userId],
    references: [users.id],
  }),
  workspace: one(workspaces, {
    fields: [memberships.workspaceId],
    references: [workspaces.id],
  }),
}))

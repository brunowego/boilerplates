import {
  pgEnum,
  pgTable,
  varchar,
  boolean,
  timestamp,
  integer,
  index,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { generateId } from '@acme/id'

export const tableNames = {
  users: 'users',
  sessions: 'user_sessions',
  tokens: 'user_tokens',
}

export const userRoleEnum = pgEnum('user_role', [
  'admin',
  'manager',
  'customer',
])

export const usersTable = pgTable(
  tableNames.users,
  {
    id: varchar('id').primaryKey().$defaultFn(generateId),
    email: varchar('email').notNull().unique(),
    emailVerified: boolean('email_verified').default(false).notNull(),
    // username: varchar('username').unique().notNull(),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name'),
    hashedPassword: varchar('hashed_password'),
    role: userRoleEnum('role').default('customer').notNull(),
    // lastSignInAt: timestamp('last_sign_in_at'),
    picture: varchar('picture'),
    githubId: integer('github_id').unique(),
    googleId: varchar('google_id').unique(),
    linkedinId: varchar('linkedin_id').unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    // createdBy: varchar('created_by'),
    // modifiedAt: timestamp('modified_at'),
    // modifiedBy: varchar('modified_by'),
  },
  (t) => ({
    emailIndex: index('users_email_index').on(t.email),
    // usernameIndex: index('users_username_index').on(t.username),
    // createdByReference: foreignKey({
    //   columns: [t.createdBy],
    //   foreignColumns: [t.id],
    // }),
    // modifiedByReference: foreignKey({
    //   columns: [t.modifiedBy],
    //   foreignColumns: [t.id],
    // }),
  }),
)

export const userRelations = relations(usersTable, ({ many }) => ({
  session: many(sessionTable),
}))

export const sessionTable = pgTable(tableNames.sessions, {
  id: varchar('id').primaryKey(),
  userId: varchar('user_id')
    .notNull()
    .references(() => usersTable.id, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
    }),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
})

export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionTable.userId],
    references: [usersTable.id],
  }),
}))

export const tokensTable = pgTable(tableNames.tokens, {
  id: varchar('id').primaryKey(),
  userId: varchar('user_id').references(() => usersTable.id, {
    onDelete: 'cascade',
  }),
  email: varchar('email'),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
})

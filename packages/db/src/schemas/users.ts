import {
  pgEnum,
  pgTable,
  varchar,
  boolean,
  timestamp,
  integer,
  index,
  // foreignKey,
  unique,
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
    emailVerified: boolean('email_verified').notNull().default(false),
    // username: varchar('username').unique().notNull(),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name'),
    hashedPassword: varchar('hashed_password'),
    role: varchar('role', { enum: ['USER', 'ADMIN'] })
      .notNull()
      .default('USER'),
    // lastSignInAt: timestamp('last_sign_in_at'),
    githubId: integer('github_id').unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    // createdBy: varchar('created_by'),
    // modifiedAt: timestamp('modified_at'),
    // modifiedBy: varchar('modified_by'),
  },
  (t) => ({
    emailIdx: index('users_email_index').on(t.email),
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

export type User = typeof usersTable.$inferSelect

export const sessionTable = pgTable(tableNames.sessions, {
  id: varchar('id').primaryKey().$defaultFn(generateId),
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
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionTable.userId],
    references: [usersTable.id],
  }),
}))

export type Session = typeof sessionTable.$inferSelect

export const tokensTable = pgTable(
  tableNames.tokens,
  {
    id: varchar('id').primaryKey(),
    userId: varchar('user_id')
      .notNull()
      .references(() => usersTable.id, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
    type: varchar('type', {
      enum: ['QUICK_ADD'],
    }).notNull(),
    email: varchar('email'),
    expiresAt: timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => ({
    unq: unique().on(t.userId, t.type, t.email),
  }),
)

export const tokenRelations = relations(tokensTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [tokensTable.userId],
    references: [usersTable.id],
  }),
}))

export type Token = typeof tokensTable.$inferSelect

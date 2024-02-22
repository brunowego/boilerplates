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
  workspaces: 'workspaces',
}

export const userRoleEnum = pgEnum('user_role', ['admin', 'manager', 'member'])

export const usersTable = pgTable(
  tableNames.users,
  {
    id: varchar('id').primaryKey().$defaultFn(generateId),
    email: varchar('email').notNull().unique(),
    emailVerified: boolean('email_verified').notNull().default(false),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name'),
    hashedPassword: varchar('hashed_password'),
    role: userRoleEnum('role').default('member').notNull(),
    githubId: integer('github_id').unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => {
    return {
      emailIndex: index('users_email_index').on(t.email),
    }
  },
)

export const userRelations = relations(usersTable, ({ many }) => ({
  session: many(sessionsTable),
}))

export type User = typeof usersTable.$inferSelect

export const sessionsTable = pgTable(tableNames.sessions, {
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
})

export const sessionRelations = relations(sessionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionsTable.userId],
    references: [usersTable.id],
  }),
}))

export type Session = typeof sessionsTable.$inferSelect

export const workspacesTable = pgTable(tableNames.workspaces, {
  id: varchar('id').primaryKey().$defaultFn(generateId),
  name: varchar('name', { length: 50 }).notNull(),
  namespace: varchar('namespace', { length: 50 }).unique().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// export const workspaceRelations = relations(
//   workspacesTable,
//   ({ many, one }) => ({}),
// )

export type Workspace = typeof workspacesTable.$inferSelect

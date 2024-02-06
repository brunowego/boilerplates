import { pgEnum, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { createSelectSchema, createInsertSchema } from 'drizzle-typebox'

export const tableNames = {
  user: 'users',
  file: 'files',
}

export const userRoleEnum = pgEnum('user_role', [
  'admin',
  'manager',
  'customer',
])

export const user = pgTable(tableNames.user, {
  id: varchar('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  username: varchar('username').notNull(),
  email: varchar('email').notNull().unique(),
  firstName: varchar('first_name').notNull(),
  lastName: varchar('last_name').notNull(),
  avatar: varchar('avatar'),
  hash: varchar('hash').notNull(),
  salt: varchar('salt').notNull(),
  role: userRoleEnum('role').default('customer').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const userRelations = relations(user, ({ many }) => ({
  files: many(file),
}))

export type User = typeof user.$inferSelect

export const file = pgTable(tableNames.file, {
  id: varchar('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  userId: varchar('user_id').notNull(),
  name: varchar('name').notNull(),
  url: varchar('url').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const fileRelations = relations(file, ({ one }) => ({
  user: one(user, {
    fields: [file.userId],
    references: [user.id],
  }),
}))

export type File = typeof file.$inferSelect
export const fileSelectSchema = createSelectSchema(file)
export const fileInsertSchema = createInsertSchema(file)

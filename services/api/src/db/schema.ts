import {
  pgTable,
  varchar,
  boolean,
  timestamp,
  index,
  foreignKey,
  json,
  primaryKey,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { generateId } from '@acme/id'

export const tableNames = {
  users: 'auth_users',
  sessions: 'auth_sessions',
  tokens: 'auth_tokens',
}

export const usersTable = pgTable(
  tableNames.users,
  {
    id: varchar('id').primaryKey().$defaultFn(generateId),
    email: varchar('email').notNull().unique(),
    emailVerified: boolean('email_verified').notNull().default(false),
    username: varchar('username').unique().notNull(),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name'),
    hashedPassword: varchar('hashed_password'),
    role: varchar('role', { enum: ['USER', 'ADMIN'] })
      .notNull()
      .default('USER'),
    lastSignInAt: timestamp('last_sign_in_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    createdBy: varchar('created_by'),
    modifiedAt: timestamp('modified_at'),
    modifiedBy: varchar('modified_by'),
  },
  (t) => {
    return {
      emailIndex: index('users_email_index').on(t.email),
      usernameIndex: index('users_username_index').on(t.username),
      createdByReference: foreignKey({
        columns: [t.createdBy],
        foreignColumns: [t.id],
      }),
      modifiedByReference: foreignKey({
        columns: [t.modifiedBy],
        foreignColumns: [t.id],
      }),
    }
  },
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
})

export const tokensTable = pgTable(tableNames.tokens, {
  id: varchar('id').primaryKey(),
  userId: varchar('user_id').references(() => usersTable.id, {
    onDelete: 'cascade',
  }),
  email: varchar('email'),
  organizationId: varchar('organization_id').references(
    () => organizationsTable.id,
    {
      onDelete: 'cascade',
    },
  ),
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

export type Session = typeof sessionTable.$inferSelect

export const organizationsTable = pgTable(
  'organizations',
  {
    id: varchar('id').primaryKey().$defaultFn(generateId),
    name: varchar('name').notNull().unique(),
    shortName: varchar('short_name').unique(),
    slug: varchar('slug').unique().notNull(),
    country: varchar('country'),
    timezone: varchar('timezone'),
    defaultLanguage: varchar('default_language'),
    languages: json('languages').$type<string[]>(),
    notificationEmail: varchar('notification_email'),
    emailDomains: json('email_domains').$type<string[]>(),
    brandColor: varchar('brand_color'),
    thumbnailUrl: varchar('thumbnail_url'),
    logoUrl: varchar('logo_url'),
    bannerUrl: varchar('banner_url'),
    websiteUrl: varchar('website_url'),
    welcomeText: varchar('welcome_text'),
    isProduction: boolean('is_production').notNull().default(false),
    authStrategies: json('auth_strategies').$type<string[]>(),
    chatSupport: boolean('chat_support').notNull().default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    createdBy: varchar('created_by').references(() => usersTable.id),
    modifiedAt: timestamp('modified_at'),
    modifiedBy: varchar('modified_by').references(() => usersTable.id),
  },
  (table) => {
    return {
      nameIndex: index('organizations_name_index').on(table.name),
    }
  },
)

export const organizationsTableRelations = relations(
  organizationsTable,
  ({ many }) => ({
    users: many(membershipsTable),
  }),
)

export type Organization = typeof organizationsTable.$inferSelect

export const membershipsTable = pgTable(
  'memberships',
  {
    organizationId: varchar('organization_id')
      .notNull()
      .references(() => organizationsTable.id, { onDelete: 'cascade' }),
    userId: varchar('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    role: varchar('role', { enum: ['ADMIN', 'MEMBER'] })
      .notNull()
      .default('MEMBER'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    createdBy: varchar('created_by').references(() => usersTable.id),
    modifiedAt: timestamp('modified_at'),
    modifiedBy: varchar('modified_by').references(() => usersTable.id),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.organizationId, table.userId],
      }),
    }
  },
)

export const membershipsTableRelations = relations(
  membershipsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [membershipsTable.userId],
      references: [usersTable.id],
    }),
    organization: one(organizationsTable, {
      fields: [membershipsTable.organizationId],
      references: [organizationsTable.id],
    }),
  }),
)

export type Membership = typeof membershipsTable.$inferSelect

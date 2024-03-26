import {
  pgEnum,
  pgTable,
  varchar,
  boolean,
  timestamp,
  integer,
  index,
  jsonb,
  bigint,
} from 'drizzle-orm/pg-core'
import { relations /*, type InferSelectModel */ } from 'drizzle-orm'

import { generateId } from '@acme/id'

export const tableNames = {
  users: 'users',
  sessions: 'user_sessions',
  tokens: 'user_tokens',
  subscriptions: 'subscriptions',
  products: 'products',
  prices: 'prices',
}

export const userRoleEnum = pgEnum('user_role', [
  'admin',
  'manager',
  'customer',
])

export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'trialing',
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'unpaid',
  'paused',
])

export const pricingTypeEnum = pgEnum('pricing_type', ['recurring', 'one_time'])

export const pricingPlanIntervalEnum = pgEnum('pricing_plan_interval', [
  'year',
  'month',
  'week',
  'day',
])

export const usersTable = pgTable(
  tableNames.users,
  {
    id: varchar('id').primaryKey().$defaultFn(generateId),
    email: varchar('email').notNull().unique(),
    emailVerified: boolean('email_verified').notNull().default(false),
    firstName: varchar('first_name'),
    lastName: varchar('last_name'),
    hashedPassword: varchar('hashed_password'),
    role: userRoleEnum('role').default('customer').notNull(),
    picture: varchar('picture'),
    githubId: integer('github_id').unique(),
    googleId: varchar('google_id').unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => {
    return {
      emailIndex: index('users_email_index').on(t.email),
    }
  },
)

export const userRelations = relations(usersTable, ({ many }) => ({
  session: many(sessionTable),
}))

export type User = typeof usersTable.$inferSelect
// export type User = InferSelectModel<
//   typeof usersTable,
//   { dbColumnNames: true }
// >
// export type UserInsert = typeof usersTable.$inferInsert

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

export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionTable.userId],
    references: [usersTable.id],
  }),
}))

export type SelectSession = typeof sessionTable.$inferSelect

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

// export type Token = typeof tokensTable.$inferSelect

// export const customers = pgTable('customers', {
//   userId: varchar('user_id').references(() => usersTable.id, {
//     onDelete: 'cascade',
//   }),
//   stripeCustomerId: varchar('stripe_customer_id'),
// })

export const productsTable = pgTable(tableNames.products, {
  id: varchar('id').primaryKey().$defaultFn(generateId),
  active: boolean('active'),
  name: varchar('name'),
  description: varchar('description'),
  image: varchar('image'),
  metadata: jsonb('metadata'),
})

export type Product = typeof productsTable.$inferSelect
export type ProductInsert = typeof productsTable.$inferInsert

export const pricesTable = pgTable(tableNames.prices, {
  id: varchar('id').primaryKey().$defaultFn(generateId),
  productId: varchar('product_id').references(() => productsTable.id, {
    onDelete: 'cascade',
  }),
  active: boolean('active'),
  description: varchar('description'),
  unitAmount: bigint('unit_amount', { mode: 'number' }),
  currency: varchar('currency'),
  type: pricingTypeEnum('type'),
  interval: pricingPlanIntervalEnum('interval'),
  intervalCount: integer('interval_count'),
  trialPeriodDays: integer('trial_period_days'),
  metadata: jsonb('metadata'),
})

export type Price = typeof pricesTable.$inferSelect
export type PriceInsert = typeof pricesTable.$inferInsert

export const subscriptionsTable = pgTable(tableNames.subscriptions, {
  id: varchar('id').primaryKey().$defaultFn(generateId),
  userId: varchar('user_id').references(() => usersTable.id, {
    onDelete: 'cascade',
  }),
  priceId: varchar('price_id').references(() => pricesTable.id, {
    onDelete: 'cascade',
  }),
  quantity: integer('quantity'),
  status: subscriptionStatusEnum('status').notNull(),
  metadata: jsonb('metadata'),
  cancelAtPeriodEnd: boolean('cancel_at_period_end'),
  created: timestamp('created').notNull(),
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  endedAt: timestamp('ended_at'),
  cancelAt: timestamp('cancel_at'),
  canceledAt: timestamp('canceled_at'),
  trialStart: timestamp('trial_start'),
  trialEnd: timestamp('trial_end'),
})

// export type Subscription = InferSelectModel<
//   typeof subscriptionsTable,
//   { dbColumnNames: true }
// >

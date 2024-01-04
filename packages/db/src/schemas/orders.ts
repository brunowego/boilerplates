import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { restaurants, users, orderItems } from './'

export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'canceled',
  'processing',
  'delivering',
  'delivered',
])

export const orders = pgTable('orders', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  customerId: text('customer_id')
    .references(() => users.id, {
      onDelete: 'set null',
    })
    .notNull(),
  restaurantId: text('restaurant_id')
    .references(() => restaurants.id, {
      onDelete: 'set null',
    })
    .notNull(),
  status: orderStatusEnum('status').default('pending').notNull(),
  totalInCents: integer('total_in_cents').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const ordersRelations = relations(orders, ({ one, many }) => ({
  customer: one(users, {
    fields: [orders.customerId],
    references: [users.id],
  }),
  restaurant: one(restaurants, {
    fields: [orders.restaurantId],
    references: [restaurants.id],
  }),
  orderItems: many(orderItems),
}))

import { pgEnum, pgTable, varchar, jsonb, boolean } from 'drizzle-orm/pg-core'

import {
  PAYMENT_METHOD_TYPES,
  PAYMENT_METHOD_IDENTIFIER_TYPES,
} from './constants'
import { id, timestamps } from './utils'

export const paymentMethodTypeEnum = pgEnum(
  'payment_method_type',
  PAYMENT_METHOD_TYPES,
)
export const paymentMethodIdentifierTypeEnum = pgEnum(
  'payment_method_identifier_type',
  PAYMENT_METHOD_IDENTIFIER_TYPES,
)

export const paymentMethods = pgTable('payment_methods', {
  ...id,
  type: paymentMethodTypeEnum('type').unique().notNull(),
  identifier: varchar('identifier'),
  identifierType: paymentMethodIdentifierTypeEnum('identifier_type'),
  params: jsonb('params'),
  enabled: boolean('enabled').default(true),
  ...timestamps,
})

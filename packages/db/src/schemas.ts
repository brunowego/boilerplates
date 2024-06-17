import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { paymentMethods } from './schema'
import {
  PAYMENT_METHOD_TYPES,
  PAYMENT_METHOD_IDENTIFIER_TYPES,
} from './constants'

export const selectPaymentMethodSchema = createSelectSchema(paymentMethods)
export const insertPaymentMethodSchema = createInsertSchema(paymentMethods, {
  type: z.enum(PAYMENT_METHOD_TYPES),
  identifier: z.string().optional(),
  identifierType: z.enum(PAYMENT_METHOD_IDENTIFIER_TYPES).optional(),
  params: z.record(z.unknown()),
  enabled: z.boolean().optional(),
})

export const insertPaymentSchema = z.object({
  methods: z.array(selectPaymentMethodSchema),
})

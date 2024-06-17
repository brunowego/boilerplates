import type { z } from 'zod'

import type {
  selectPaymentMethodSchema,
  insertPaymentMethodSchema,
  selectPaymentSchema,
} from './schemas'

export type PaymentMethod = z.infer<typeof selectPaymentMethodSchema>
export type InsertPaymentMethod = z.infer<typeof insertPaymentMethodSchema>

export type Payment = z.infer<typeof selectPaymentSchema>

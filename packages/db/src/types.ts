import type { z } from 'zod'

import type {
  selectPaymentMethodSchema,
  insertPaymentMethodSchema,
} from './schemas'

export type PaymentMethod = z.infer<typeof selectPaymentMethodSchema>
export type InsertPaymentMethod = z.infer<typeof insertPaymentMethodSchema>

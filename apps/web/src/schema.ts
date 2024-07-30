import z from '@acme/ui/lib/zod'

const accountSchema = z.object({
  id: z.string(),
  name: z.string(),
})

const installmentSchema = z.object({
  number: z.number(),
  total: z.number(),
})

const creditCardSettingsSchema = z.object({
  operation_type: z.string(),
  installments: z.array(installmentSchema),
})

const paymentSettingsSchema = z.object({
  accepted_payment_methods: z.array(z.string()),
  accepted_multi_payment_methods: z.array(z.unknown()),
  credit_card_settings: creditCardSettingsSchema,
})

const itemSchema = z.object({
  name: z.string(),
  amount: z.number(),
  default_quantity: z.number(),
})

const cartSettingsSchema = z.object({
  item_total_cost: z.number(),
  total_cost: z.number(),
  items: z.array(itemSchema),
})

const dataSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
  url: z.string().url(),
  payment_link_type: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  account_info: z.object({
    merchant_id: z.string(),
    account_id: z.string(),
    account_name: z.string(),
  }),
  payment_settings: paymentSettingsSchema,
  cart_settings: cartSettingsSchema,
})

const webhookSchema = z.object({
  id: z.string(),
  account: accountSchema,
  type: z.string(),
  created_at: z.string(),
  data: dataSchema,
})

export { webhookSchema }

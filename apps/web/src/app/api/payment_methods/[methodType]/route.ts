import { z } from '@acme/ui/lib/zod'

import {
  PAYMENT_METHOD_TYPES,
  insertPaymentMethodSchema,
  db,
  eq,
  paymentMethods,
} from '@acme/db'

const contextSchema = z.object({
  params: z.object({
    methodType: z.enum(PAYMENT_METHOD_TYPES),
  }),
})

const createSchema = insertPaymentMethodSchema.pick({
  identifier: true,
  identifierType: true,
  params: true,
})

type PaymentMethod = z.infer<typeof createSchema>

export async function POST(
  req: Request,
  ctx: z.infer<typeof contextSchema>,
): Promise<Response> {
  const {
    params: { methodType: type },
  } = contextSchema.parse(ctx)
  try {
    const json: PaymentMethod = await req.json()

    const { identifier, identifierType, params } = createSchema.parse(json)

    const existingPaymentMethod = await db.query.paymentMethods.findFirst({
      where: eq(paymentMethods.type, type),
    })

    if (existingPaymentMethod) {
      return new Response(null, { status: 409 })
    }

    await db.insert(paymentMethods).values({
      type,
      identifier,
      identifierType,
      params,
    })

    return new Response(null, {
      status: 201,
    })
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err)
    }

    return new Response(null, {
      status: 500,
    })
  }
}

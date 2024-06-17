import { NextResponse } from 'next/server'

import {
  PAYMENT_METHOD_TYPES,
  getPaymentMethods,
  type InsertPaymentMethod,
  insertPaymentMethodsSchema,
  db,
  paymentMethods,
} from '@acme/db'

export async function GET(_: Request): Promise<Response> {
  try {
    const response = await getPaymentMethods()

    const methods = PAYMENT_METHOD_TYPES.map((type) => ({
      ...{ type, enabled: false },
      ...response.find((item) => item.type === type && item),
    }))

    return NextResponse.json(
      { methods },
      {
        status: 200,
      },
    )
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err)
    }

    return new Response(null, {
      status: 500,
    })
  }
}

export async function PATCH(req: Request): Promise<Response> {
  try {
    const pm = await getPaymentMethods()

    if (!pm) {
      return new Response(null, { status: 404 })
    }

    const json: InsertPaymentMethod[] = await req.json()

    const result = insertPaymentMethodsSchema.parse([...pm, ...json])

    result.map(async (item) => {
      await db
        .insert(paymentMethods)
        .values(item)
        .onConflictDoUpdate({
          target: paymentMethods.type,
          set: { ...item },
        })
    })

    return new Response(null, {
      status: 200,
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

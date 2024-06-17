import { NextResponse } from 'next/server'

import { db, PAYMENT_METHOD_TYPES } from '@acme/db'

export async function GET(_: Request): Promise<Response> {
  try {
    const response = await db.query.paymentMethods.findMany({
      columns: {
        type: true,
        identifier: true,
        identifierType: true,
        params: true,
        enabled: true,
      },
    })

    const paymentMethods = PAYMENT_METHOD_TYPES.map((type) => ({
      ...{ type, enabled: false },
      ...response.find((item) => item.type === type && item),
    }))

    return NextResponse.json(paymentMethods, {
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

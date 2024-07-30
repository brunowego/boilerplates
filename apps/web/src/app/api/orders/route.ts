import { NextResponse } from 'next/server'

import { client, OrdersController } from '@/lib/pagarme'

export async function GET(): Promise<Response> {
  const ordersController = new OrdersController(client)

  try {
    const { result } = await ordersController.getOrders()

    return NextResponse.json(result, {
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

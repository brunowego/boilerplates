import { NextResponse } from 'next/server'

import { client, SubscriptionsController } from '@/lib/pagarme'

export async function GET(): Promise<Response> {
  const subscriptionsController = new SubscriptionsController(client)

  try {
    const { result } = await subscriptionsController.getSubscriptions()

    return NextResponse.json(result, {
      status: 200,
    })
  } catch (err) {
    console.error(err)

    return new Response(null, {
      status: 500,
    })
  }
}

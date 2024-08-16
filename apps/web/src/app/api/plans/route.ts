import { NextResponse } from 'next/server'

import { client, PlansController } from '@/lib/pagarme'

export async function GET(): Promise<Response> {
  const plansController = new PlansController(client)

  try {
    const { result } = await plansController.getPlans()

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

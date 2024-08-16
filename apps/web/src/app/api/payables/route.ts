import { NextResponse } from 'next/server'

import { client, PayablesController } from '@/lib/pagarme'

export async function GET(): Promise<Response> {
  const payablesController = new PayablesController(client)

  try {
    const { result } = await payablesController.getPayables()

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

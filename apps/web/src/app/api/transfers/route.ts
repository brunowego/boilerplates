import { NextResponse } from 'next/server'

import { client, TransfersController } from '@/lib/pagarme'

export async function GET(): Promise<Response> {
  const transfersController = new TransfersController(client)

  try {
    const { result } = await transfersController.getTransfers()

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

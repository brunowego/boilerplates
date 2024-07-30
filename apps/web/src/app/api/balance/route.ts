import { NextResponse } from 'next/server'

import { client, BalanceOperationsController } from '@/lib/pagarme'

export async function GET(): Promise<Response> {
  const balanceController = new BalanceOperationsController(client)

  try {
    const { result } = await balanceController.getBalanceOperations()

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

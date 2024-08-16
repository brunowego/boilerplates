import { NextResponse } from 'next/server'

import { client, InvoicesController } from '@/lib/pagarme'

export async function GET(): Promise<Response> {
  const invoicesController = new InvoicesController(client)

  try {
    const { result } = await invoicesController.getInvoices()

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

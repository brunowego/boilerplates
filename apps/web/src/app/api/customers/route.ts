import { NextResponse } from 'next/server'

import { client, CustomersController } from '@/lib/pagarme'

export async function GET(): Promise<Response> {
  const customersController = new CustomersController(client)

  try {
    const { result } = await customersController.getCustomers()

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

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

export async function POST(): Promise<Response> {
  const customersController = new CustomersController(client)

  try {
    const { result } = await customersController.createCustomer({
      name: 'Bruno Gomes',
      email: 'brunowego@gmail.com',
      document: '01479506192',
      type: 'individual',
      address: {
        street: 'QSB 02',
        number: '14',
        zipCode: '72015520',
        neighborhood: 'Taguatinga',
        city: 'Taguatinga',
        state: 'DF',
        country: 'BR',
        complement: '',
        line1: '',
        line2: '',
      },
      metadata: {},
      phones: {},
      code: '01J627K5J7S62T36CY52Q5GBGM',
    })

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

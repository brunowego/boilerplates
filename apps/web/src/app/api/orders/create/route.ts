import { NextResponse } from 'next/server'

import { client, OrdersController } from '@/lib/pagarme'

export async function POST(): Promise<Response> {
  const ordersController = new OrdersController(client)

  try {
    const { result } = await ordersController.createOrder({
      items: [
        {
          amount: 500,
          description: 'Livro',
          quantity: 1,
          category: '1',
        },
      ],
      customer: {
        name: 'Bruno Gomes',
        email: 'me@brunowego.com',
        document: '01479506192',
        type: 'individual',
        address: {
          zipCode: '72015520',
          state: 'DF',
          city: 'Taguatinga',
          street: '',
          number: '',
          neighborhood: '',
          country: 'BR',
          complement: '',
          line1: 'QSB 02 Lote 14',
          line2: '',
        },
        metadata: {},
        phones: {},
        code: '01J5C9QXA6XXF6XZWX72SN66PN',
      },
      payments: [
        {
          paymentMethod: 'pix',
          pix: {
            expiresIn: 52134613,
            additionalInformation: [
              {
                name: 'Quantidade',
                value: '2000',
              },
            ],
          },
          split: [
            {
              amount: 70,
              recipientId: 're_clzlot9h30rrh0l9trjjxclrx',
              type: 'percentage',
              options: {
                liable: true,
                chargeRemainderFee: true,
                chargeProcessingFee: true,
              },
            },
            {
              amount: 30,
              recipientId: 're_clzvmcgob03bg0k9tpg9jqlhi',
              type: 'percentage',
              options: {
                liable: false,
                chargeRemainderFee: false,
                chargeProcessingFee: false,
              },
            },
          ],
        },
      ],
      code: '01J5C9C3GV8JZ44QM1YMYVEYEX',
      closed: false,
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

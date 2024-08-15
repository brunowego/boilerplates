import { NextResponse } from 'next/server'

import { client, RecipientsController } from '@/lib/pagarme'

export async function POST(): Promise<Response> {
  const recipientsController = new RecipientsController(client)

  try {
    const { result } = await recipientsController.createRecipient({
      name: 'Karina Lima',
      document: '04989551176',
      type: 'individual',
      defaultBankAccount: {
        holderName: 'Karina Maria Lima Felix',
        holderType: 'individual',
        holderDocument: '04989551176',
        bank: '077',
        branchNumber: '0001',
        accountNumber: '2034550',
        accountCheckDigit: '0',
        type: 'checking',
        metadata: {},
      },
      metadata: {},
      code: '2',
      paymentMode: 'bank_transfer',
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

import { NextResponse } from 'next/server'

import { client, RecipientsController } from '@/lib/pagarme'

export async function POST(): Promise<Response> {
  const recipientsController = new RecipientsController(client)

  try {
    const { result } = await recipientsController.createRecipient({
      name: 'Bruno Gomes',
      document: '01479506192',
      type: 'individual',
      defaultBankAccount: {
        holderName: 'Bruno Wesley Gomes Batista',
        holderType: 'individual',
        holderDocument: '01479506192',
        bank: '077',
        branchNumber: '0001',
        accountNumber: '2034550',
        accountCheckDigit: '0',
        type: 'checking',
        metadata: {},
      },
      metadata: {},
      code: '',
      paymentMode: 'bank_transfer',
    })

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

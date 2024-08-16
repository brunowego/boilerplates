import { NextResponse } from 'next/server'

import { client, RecipientsController } from '@/lib/pagarme'

export async function POST(): Promise<Response> {
  const recipientsController = new RecipientsController(client)

  try {
    const { result } =
      await recipientsController.updateRecipientDefaultBankAccount(
        're_clzvmcgob03bg0k9tpg9jqlhi',
        {
          bankAccount: {
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
          paymentMode: 'bank_transfer',
        },
      )

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

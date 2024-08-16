import { NextResponse } from 'next/server'

import { client, RecipientsController } from '@/lib/pagarme'

export async function POST(): Promise<Response> {
  const recipientsController = new RecipientsController(client)

  try {
    const { result } =
      await recipientsController.updateRecipientTransferSettings(
        're_clzvmcgob03bg0k9tpg9jqlhi',
        {
          transferEnabled: 'true',
          transferInterval: 'Daily',
          transferDay: '0',
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

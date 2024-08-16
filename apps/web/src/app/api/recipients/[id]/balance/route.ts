import { NextResponse } from 'next/server'

import { client, RecipientsController } from '@/lib/pagarme'

export async function GET(): Promise<Response> {
  const recipientsController = new RecipientsController(client)

  try {
    const { result } = await recipientsController.getBalance(
      're_clzvmcgob03bg0k9tpg9jqlhi',
    )

    return NextResponse.json(
      JSON.parse(
        JSON.stringify(result, (_, value) =>
          typeof value === 'bigint' ? value.toString() : value,
        ),
      ),
      {
        status: 200,
      },
    )
  } catch (err) {
    console.error(err)

    return new Response(null, {
      status: 500,
    })
  }
}

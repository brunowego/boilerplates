import { NextResponse } from 'next/server'

import { client, RecipientsController } from '@/lib/pagarme'

export async function GET(): Promise<Response> {
  const recipientsController = new RecipientsController(client)

  try {
    const { result } = await recipientsController.createKYCLink(
      're_clzvmcgob03bg0k9tpg9jqlhi',
    )

    return NextResponse.json(result, {
      status: 200,
    })
  } catch (err) {
    console.error(err)

    return new Response(JSON.stringify(err), {
      status: 500,
    })
  }
}

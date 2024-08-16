import { NextResponse } from 'next/server'

import { client, RecipientsController } from '@/lib/pagarme'

export async function GET(): Promise<Response> {
  const recipientsController = new RecipientsController(client)

  try {
    // const { result } = await recipientsController.getRecipientByCode()
    const { result } = await recipientsController.getRecipient(
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

export async function POST(): Promise<Response> {
  const recipientsController = new RecipientsController(client)

  try {
    const { result } = await recipientsController.updateRecipient(
      're_clzvmcgob03bg0k9tpg9jqlhi',
      {
        name: 'Bruno Wesley Gomes Batista',
        email: 'me@brunowego.com',
        description: 'Recebedor da Henkiz Tecnologia',
        type: 'individual',
        status: 'active',
        metadata: {},
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

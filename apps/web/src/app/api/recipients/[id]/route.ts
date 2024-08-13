import { NextResponse } from 'next/server'

import { client, RecipientsController } from '@/lib/pagarme'

export async function GET(): Promise<Response> {
  const recipientsController = new RecipientsController(client)

  try {
    // const { result } = await recipientsController.getRecipientByCode()
    const { result } = await recipientsController.getRecipient(
      're_clzrqr5aj5q1h0l9tjberbyrp',
    )

    return NextResponse.json(result, {
      status: 200,
    })
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err)
    }

    return new Response(JSON.stringify(err), {
      status: 500,
    })
  }
}

// export async function PATH(): Promise<Response> {
//   const recipientsController = new RecipientsController(client)

//   try {
//     const { result } = await recipientsController.updateRecipient(
//       're_clzrqr5aj5q1h0l9tjberbyrp',
//       {
//         code: '3',
//       },
//     )

//     return NextResponse.json(result, {
//       status: 200,
//     })
//   } catch (err) {
//     if (process.env.NODE_ENV === 'development') {
//       console.error(err)
//     }

//     return new Response(null, {
//       status: 500,
//     })
//   }
// }

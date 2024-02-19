// // import { getCachedSession } from '@/lib/auth/session'
// import { db } from '@acme/db'
// import { usersTable } from '@acme/db/schema'
// import { NextResponse } from 'next/server'

// export async function GET(): Promise<Response> {
//   // const { user } = await getCachedSession()

//   // if (!user) {
//   //   return new Response('Unauthorized', {
//   //     status: 401,
//   //   })
//   // }

//   const users = await db.select().from(usersTable)

//   // return NextResponse.json({ data: users }, { status: 200 })

//   return new Response(stream, {
//     headers: {
//       'Content-Type': 'text/plain; charset=utf-8',
//     },
//     status: 200,
//   })
// }

import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(_: NextRequest) {
  const transformStream = new TransformStream()
  const writer = transformStream.writable.getWriter()
  const encoder = new TextEncoder()

  const randomNumbers = Array.from({ length: 100 }, () =>
    Math.floor(Math.random() * 10),
  )

  setTimeout(() => {
    randomNumbers.forEach((number, index) => {
      setTimeout(() => {
        writer.write(encoder.encode('event: message\n'))
        writer.write(encoder.encode(`id: ${new Date().getTime()}\n`))
        writer.write(encoder.encode(`data: ${number}\n\n`))
      }, index * 1000)
    })
  }, 2000)

  return new Response(transformStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
    status: 200,
  })
}

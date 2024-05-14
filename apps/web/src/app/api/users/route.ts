import { NextResponse } from 'next/server'

import { getUsers } from '@acme/db/queries'

const delay = (ms: number | undefined) =>
  new Promise((res) => setTimeout(res, ms))

export async function GET(): Promise<Response> {
  await delay(5000)

  try {
    const response = await getUsers()

    return NextResponse.json(response, {
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

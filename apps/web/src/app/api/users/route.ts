import { NextResponse } from 'next/server'

import { getUsers } from '@acme/db/queries'

export async function GET(): Promise<Response> {
  try {
    const response = await getUsers()

    return NextResponse.json(response, {
      status: 200,
    })
  } catch (err) {
    console.error(err)

    return new Response(null, {
      status: 500,
    })
  }
}

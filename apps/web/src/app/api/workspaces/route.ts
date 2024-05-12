import { NextResponse } from 'next/server'

import { getWorkspaces } from '@acme/db/queries'

export async function GET(): Promise<Response> {
  try {
    const response = await getWorkspaces()

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

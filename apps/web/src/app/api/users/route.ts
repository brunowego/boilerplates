import { NextResponse } from 'next/server'

import { auth } from '@acme/auth'
import { getUsers } from '@acme/db/queries'

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return new NextResponse(null, {
      status: 401,
    })
  }

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
})

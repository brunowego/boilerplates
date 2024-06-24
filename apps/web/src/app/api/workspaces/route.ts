import { NextResponse } from 'next/server'

import { auth } from '@acme/auth'
import { getWorkpacesByUserId } from '@acme/db/queries'

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return new Response(null, {
      status: 401,
    })
  }

  const userId = req.auth.user?.id

  if (!userId) {
    return new Response(null, {
      status: 404,
    })
  }

  try {
    const response = await getWorkpacesByUserId(userId)

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

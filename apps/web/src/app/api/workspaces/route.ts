import { NextResponse } from 'next/server'

import { auth } from '@acme/auth'
import { getWorkpaces } from '@acme/db'

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return new Response(null, {
      status: 401,
    })
  }

  // if (!req.auth.user?.id) {
  //   return new Response(null, {
  //     status: 404,
  //   })
  // }

  try {
    const response = await getWorkpaces()

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

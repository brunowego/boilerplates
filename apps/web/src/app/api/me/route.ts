import { NextResponse } from 'next/server'

import { auth } from '@acme/auth'

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
    return NextResponse.json(req.auth, {
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

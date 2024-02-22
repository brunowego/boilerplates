import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { getCachedSession, auth } from '@/lib/auth'

export async function POST(): Promise<Response> {
  const { session } = await getCachedSession()

  if (!session) {
    return new NextResponse(null, {
      status: 401,
    })
  }

  await auth.invalidateSession(session.id)

  const sessionCookie = auth.createBlankSessionCookie()

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/',
    },
  })
}
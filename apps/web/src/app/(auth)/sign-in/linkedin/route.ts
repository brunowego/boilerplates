import { cookies } from 'next/headers'

import { generateState } from '@acme/auth/lib/arctic'
import { linkedin } from '@acme/auth/providers'

export async function GET(): Promise<Response> {
  const state = generateState()
  const url = await linkedin.createAuthorizationURL(state, {
    scopes: ['email', 'profile'],
  })

  cookies().set('linkedin_oauth_state', state, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return Response.redirect(url)
}

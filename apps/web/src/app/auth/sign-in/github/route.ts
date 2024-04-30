import { cookies } from 'next/headers'

import { generateState } from '@acme/auth/lib/arctic'
import { github } from '@acme/auth/providers'

export async function GET(): Promise<Response> {
  const state = generateState()
  const url = await github.createAuthorizationURL(state)

  cookies().set('github_oauth_state', state, {
    domain: 'acme.localtest.me',
    httpOnly: true,
    maxAge: 60 * 10,
    path: '/',
    // sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return Response.redirect(url)
}

import { cookies } from 'next/headers'

import { generateState, generateCodeVerifier } from '@acme/auth/lib/arctic'
import { google } from '@acme/auth/providers'

export async function GET(): Promise<Response> {
  const state = generateState()
  const codeVerifier = generateCodeVerifier()
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ['email', 'profile'],
  })

  cookies().set('google_oauth_state', state, {
    domain: 'acme.localtest.me',
    httpOnly: true,
    maxAge: 60 * 10,
    path: '/',
    // sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  cookies().set('google_oauth_code_verifier', codeVerifier, {
    domain: 'acme.localtest.me',
    httpOnly: true,
    maxAge: 60 * 10,
    path: '/',
    // sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return Response.redirect(url)
}

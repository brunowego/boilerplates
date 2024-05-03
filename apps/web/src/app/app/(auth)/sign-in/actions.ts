'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { generateState } from '@acme/auth/lib/arctic'
import { github } from '@acme/auth/providers'

export async function setNextUrl(url: string): Promise<void> {
  cookies().set('next', url, {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}

export async function signInWithGitHub(): Promise<Response> {
  const state = generateState()
  const url = await github.createAuthorizationURL(state)

  cookies().set('github_oauth_state', state, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return redirect(url.toString())
}

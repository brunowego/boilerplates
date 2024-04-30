'use server'

import { cookies } from 'next/headers'

export async function setNextUrl(url: string): Promise<void> {
  cookies().set('next', url, {
    domain: 'acme.localtest.me',
    path: '/',
    httpOnly: true,
    maxAge: 60 * 10,
    // sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}

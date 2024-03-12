'use server'

import { cookies } from 'next/headers'

export async function redirect(uri: string): Promise<void> {
  cookies().set('redirect_uri', uri, {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}

import type { JSX } from 'react'

import Link from 'next/link'

import { getCachedSession } from '@/lib/auth/session'

import { Logout } from './components/logout'

export default async function HomePage(): Promise<JSX.Element> {
  const { user } = await getCachedSession()

  return (
    <main className='container py-8'>
      {user ? (
        <Logout />
      ) : (
        <Link href='http://localhost:3000/sign-in?redirect_uri=http://localhost:3001'>
          Sign in
        </Link>
      )}
    </main>
  )
}

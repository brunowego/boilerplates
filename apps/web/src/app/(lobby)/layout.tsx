import type { ReactNode, JSX } from 'react'

import { auth } from '@acme/auth'
import Layout from '@acme/ui/components/layout'
import { Users, LogIn } from '@acme/ui/components/icon'

import LogOut from '@/components/log-out'
import Link from 'next/link'

interface LobbyLayoutProps {
  children: ReactNode
  modal: ReactNode
}

export default async function LobbyLayout({
  children,
  modal,
}: LobbyLayoutProps): Promise<JSX.Element> {
  const session = await auth()

  return (
    <Layout>
      <Layout.Header>
        {session?.user ? (
          <>
            <Link href='/users'>
              <Users className='size-5' />
            </Link>

            <LogOut className='mt-auto' />
          </>
        ) : (
          <Link className='mt-auto' href='/sign-in'>
            <LogIn className='size-5 shrink-0' />

            <span className='sr-only'>Sign In</span>
          </Link>
        )}
      </Layout.Header>

      <Layout.Content>
        {children}

        {modal}
      </Layout.Content>

      <Layout.Aside />
    </Layout>
  )
}

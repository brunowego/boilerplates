import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { LogoMark } from '@acme/ui/components/logo'

import ThemeToggle from '@/components/theme-toggle'

import { getSession } from './actions'
import LogOut from '@/components/log-out'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface AppLayoutProps {
  children: ReactNode
}

export default async function AppLayout({
  children,
}: AppLayoutProps): Promise<JSX.Element> {
  const { user } = await getSession()

  if (!user) {
    return redirect('/sign-in')
  }

  return (
    <div className='flex h-screen 2xl:container'>
      <div className='-translate-x-full fixed top-0 bottom-0 w-full bg-secondary' />

      <header className='fixed inset-y-0 flex w-16 flex-col gap-y-2 bg-secondary px-2 py-4 text-center'>
        <Link className='self-center py-1' href='/'>
          <LogoMark className='size-8' />
        </Link>

        <LogOut className='mt-auto' />

        <ThemeToggle className='self-center' />
      </header>

      <main className='w-full pl-16'>{children}</main>

      <aside className='w-96 shrink-0 border-l' />
    </div>
  )
}

import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import Link from 'next/link'

import Logo from '@acme/ui/components/logo'
import ThemeToggle from '@acme/ui/components/theme-toggle'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <div className='flex h-screen 2xl:container'>
      <div className='-translate-x-full fixed top-0 bottom-0 w-full bg-secondary' />

      <header className='fixed inset-y-0 flex w-16 flex-col bg-secondary px-2 py-4 text-center'>
        <Link className='self-center py-1' href='/'>
          <Logo.mark className='size-8' />
        </Link>

        <ThemeToggle className='mt-auto self-center' />
      </header>

      <main className='w-full pl-16'>
        <article>{children}</article>
      </main>

      <aside className='w-96 shrink-0 border-l' />
    </div>
  )
}

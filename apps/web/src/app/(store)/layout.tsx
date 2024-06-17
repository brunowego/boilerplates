import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import Link from 'next/link'

import { LogoMark } from '@acme/ui/components/logo'
import Cart from '@/components/cart'

export const metadata: Metadata = {
  title: 'Store',
}

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <main className='space-y-4'>
      <nav className='container my-1 flex h-16 items-center justify-between font-medium text-lg'>
        <div className='space-x-10 *:inline-flex'>
          <Link href='/'>Shop</Link>

          <Link href='/'>Search</Link>
        </div>

        <LogoMark className='size-10' />

        <div className='space-x-10 *:inline-flex'>
          <Cart />

          <Link href='/'>Sign in</Link>
        </div>
      </nav>

      {children}
    </main>
  )
}

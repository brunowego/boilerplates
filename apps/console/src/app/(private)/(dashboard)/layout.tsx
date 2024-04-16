import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import ThemeToggle from '@/components/theme-toggle'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps): JSX.Element {
  return (
    <div className='flex h-screen 2xl:container'>
      <div className='-translate-x-full fixed top-0 bottom-0 w-full bg-secondary' />

      <header className='fixed inset-y-0 w-16 bg-secondary p-2 text-center'>
        <ThemeToggle />
      </header>

      <main className='w-full pl-16'>
        <article className='p-4 lg:px-5'>{children}</article>
      </main>

      <aside className='w-96 shrink-0 border-l' />
    </div>
  )
}

import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import {
  TeamSwitcher,
  MainNav,
  Search,
  UserNav,
  ThemeToggle,
} from '@/components'

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
    <div className='hidden flex-col md:flex'>
      <div className='border-b'>
        <div className='container flex items-center h-16'>
          <TeamSwitcher />

          <MainNav className='mx-6' />

          <div className='flex items-center ml-auto space-x-4'>
            <Search />

            <UserNav />

            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className='container flex-1 py-4 space-y-4'>{children}</div>
    </div>
  )
}

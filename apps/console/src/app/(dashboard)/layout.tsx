import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import { redirect } from 'next/navigation'

import { Search } from '@acme/ui'

import { getCachedSession } from '@/lib/auth'
import { TeamSwitcher, MainNav, UserNav, ThemeToggle } from '@/components'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface DashboardLayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps): Promise<JSX.Element> {
  const { user } = await getCachedSession()

  if (!user) {
    return redirect('/sign-in')
  }

  // if (user.onboard) {
  //   redirect('/onboard')
  // }

  return (
    <div className='hidden flex-col md:flex'>
      <div className='border-b'>
        <div className='flex items-center px-4 h-16'>
          <TeamSwitcher />

          <MainNav className='mx-6' />

          <div className='flex items-center ml-auto space-x-4'>
            <Search />

            <UserNav />

            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className='flex-1 p-8 pt-6 space-y-4'>{children}</div>
    </div>
  )
}

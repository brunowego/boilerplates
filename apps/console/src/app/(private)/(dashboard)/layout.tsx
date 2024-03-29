import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import { Header } from '@/components'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface DashboardLayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps): Promise<JSX.Element> {
  return (
    <div className='hidden flex-col md:flex'>
      <div className='border-b'>
        <Header />
      </div>

      <div className='container flex-1 py-4 space-y-4'>{children}</div>
    </div>
  )
}

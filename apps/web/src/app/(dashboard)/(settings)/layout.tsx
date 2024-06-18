import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import Sidebar from '@/components/sidebar'

export const metadata: Metadata = {
  title: 'Settings',
}

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps): JSX.Element {
  return (
    <>
      <Sidebar />
      {children}
    </>
  )
}

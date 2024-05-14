import type { ReactNode, JSX } from 'react'

import Nav from './components/nav'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps): JSX.Element {
  return (
    <>
      <Nav />

      {children}
    </>
  )
}

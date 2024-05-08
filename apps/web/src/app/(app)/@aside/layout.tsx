import type { ReactNode, JSX } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps): JSX.Element {
  return <>{children}</>
}

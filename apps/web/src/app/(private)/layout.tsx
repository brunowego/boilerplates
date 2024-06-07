import type { ReactNode, JSX } from 'react'
import { redirect } from 'next/navigation'

import { getCachedSession } from '@/lib/auth/session'

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

  return <>{children}</>
}

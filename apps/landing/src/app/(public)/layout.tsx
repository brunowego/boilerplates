import type { ReactNode, JSX } from 'react'

import { ThemeToggle } from '@/components'

interface PublicLayoutProps {
  children: ReactNode
}

export default function PublicLayout({
  children,
}: PublicLayoutProps): JSX.Element {
  return (
    <div className='container'>
      <ThemeToggle />

      {children}
    </div>
  )
}

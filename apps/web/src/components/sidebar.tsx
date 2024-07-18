'use client'

import type { ReactNode, JSX } from 'react'

type SidebarProps = {
  children?: ReactNode
}

export default function Sidebar({
  children,
}: SidebarProps): JSX.Element | null {
  return (
    <div className='z-10 w-80 border-r'>
      <aside className='sticky top-0'>{children}</aside>
    </div>
  )
}

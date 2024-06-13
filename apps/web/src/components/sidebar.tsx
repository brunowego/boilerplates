'use client'

import type { JSX } from 'react'

import cn from '@acme/ui/utils/cn'

type SidebarProps = {
  className?: string
}

export default function Sidebar({ className }: SidebarProps): JSX.Element {
  return (
    <nav className={cn('w-56 shrink-0 border-r lg:w-64 xl:w-72', className)} />
  )
}

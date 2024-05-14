'use client'

import type { JSX } from 'react'
import { usePathname } from 'next/navigation'

import { Tabs } from '@/components/tabs'

const tabs = [
  { label: 'Users', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Settings', href: '/settings' },
]

export default function Nav(): JSX.Element {
  const pathname = usePathname()

  return (
    <Tabs
      layoutId='dashboard'
      tabs={tabs.map((tab) => ({ ...tab, isActive: pathname === tab.href }))}
    />
  )
}

'use client'

import type { JSX } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import Page from '@acme/ui/components/page'
import cn from '@acme/ui/utils/cn'

const nav = [
  {
    title: 'General',
    href: '/nav-tab',
  },
  {
    title: 'Members',
    href: '/members',
  },
  {
    title: 'Domains',
    href: '/domains',
  },
  {
    title: 'Bank data',
    href: '/bank-data',
  },
  {
    title: 'Preferences',
    href: '/preferences',
  },
]

export default function NavTab(): JSX.Element {
  const pathname = usePathname()

  return (
    <Page>
      <Page.Header>
        <Page.Title>Nav Tab</Page.Title>

        <nav className='flex h-12 space-x-4 text-sm *:flex *:items-center'>
          {nav.map(({ href, title }, index) => (
            <Link
              className={cn(
                '-mb-px border-b hover:border-foreground',
                pathname === href
                  ? 'border-foreground text-foreground'
                  : 'text-muted-foreground',
              )}
              href='/'
              // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
              key={index}
            >
              {title}
            </Link>
          ))}
        </nav>
      </Page.Header>

      <Page.Content />
    </Page>
  )
}

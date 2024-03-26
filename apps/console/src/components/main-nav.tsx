'use client'

import type { JSX } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { cn } from '@acme/ui'

import { mainMenu } from '@/data'

type MainNavProps = {
  className?: string
}

export default function MainNav({ className }: MainNavProps): JSX.Element {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'font-medium text-sm flex items-center space-x-4 lg:space-x-6',
        className,
      )}
    >
      {mainMenu.map(({ href, title }) => (
        <Link
          href={href}
          key={href}
          className={cn(
            'transition-colors hover:text-primary',
            pathname === href ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          {title}
        </Link>
      ))}
    </nav>
  )
}

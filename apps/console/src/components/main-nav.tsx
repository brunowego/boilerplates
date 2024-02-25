'use client'

import { usePathname } from 'next/navigation'

import { cn } from '@acme/ui'

import { mainMenu } from '@/data'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'font-medium text-sm flex items-center space-x-4 lg:space-x-6',
        className,
      )}
      {...props}
    >
      {mainMenu.map(({ href, title }) => (
        <a
          href={href}
          key={href}
          className={cn(
            'transition-colors hover:text-primary',
            pathname === href ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          {title}
        </a>
      ))}
    </nav>
  )
}

'use client'

import Link from 'next/link'

import cn from '@acme/ui/lib/cn'
import { motion } from '@acme/ui/lib/motion'

export type TabsProps = {
  className?: string
  tabs: {
    href: string
    label: string
    isActive?: boolean
  }[]
  layoutId: string
}

export function Tabs({ className, tabs, layoutId }: TabsProps) {
  return (
    <div
      className={cn(
        'flex h-12 gap-x-4 border-b px-4 text-sm leading-6 lg:gap-x-5 lg:px-5',
        className,
      )}
    >
      {tabs.map(({ href, label, isActive }, index) => (
        <Link
          className='group'
          href={href}
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a list of static links
          key={index}
        >
          <div className='flex h-full items-center'>{label}</div>

          {isActive ? (
            <motion.div className='h-px bg-green-500' layoutId={layoutId} />
          ) : (
            <div className='h-px bg-muted-foreground opacity-0 transition group-hover:opacity-100' />
          )}
        </Link>
      ))}
    </div>
  )
}

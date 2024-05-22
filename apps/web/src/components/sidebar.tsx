'use client'

import type { JSX } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import cn from '@acme/ui/utils/cn'
import type Icon from '@acme/ui/components/icon'
import { Avatar, AvatarImage, AvatarFallback } from '@acme/ui/components/avatar'

import DynamicIcon from './dynamic-icon'

const menus = [
  {
    title: 'Your account',
    links: [
      {
        icon: 'CircleUser',
        title: 'Profile',
        href: '/personal',
      },
    ],
  },
] as {
  title: string
  links?: {
    icon?: keyof typeof Icon
    logo?: string
    title: string
    href: string
  }[]
}[]

type SidebarProps = {
  className?: string
}

export default function Sidebar({ className }: SidebarProps): JSX.Element {
  const pathname = usePathname()

  return (
    <nav className={cn('w-56 shrink-0 border-r lg:w-64 xl:w-72', className)}>
      <div className='fixed inset-y-0 flex w-[inherit] flex-col gap-y-4 p-4 px-5'>
        <h4 className='font-medium text-lg leading-10'>Settings</h4>

        {menus.map(({ title, links }, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
          <div className='flex flex-shrink-0 flex-col text-sm' key={index}>
            <h6 className='font-medium'>{title}</h6>

            <div className='mt-2 space-y-1'>
              {links?.map(({ icon, logo, title, href }, index) => {
                return (
                  <Link
                    className={cn(
                      '-mx-2 flex h-8 items-center gap-2 rounded-sm border border-transparent px-2 py-1.5 hover:border-secondary',
                      pathname === href ? 'bg-secondary' : '',
                    )}
                    href={href}
                    // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
                    key={index}
                  >
                    {icon && <DynamicIcon icon={icon} className='size-4' />}

                    {logo && (
                      <Avatar className='size-8'>
                        <AvatarImage src='' />
                        <AvatarFallback className='bg-secondary'>
                          A
                        </AvatarFallback>
                      </Avatar>
                    )}

                    {title}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  )
}

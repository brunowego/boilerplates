import type { JSX } from 'react'
import Link from 'next/link'

import cn from '@acme/ui/lib/cn'
import type Icon from '@acme/ui/components/icon'
import { Avatar, AvatarImage, AvatarFallback } from '@acme/ui/components/avatar'
import { LogOut, MoveLeft } from '@acme/ui/components/icon'

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
      {
        icon: 'Shield',
        title: 'Security',
        href: '/security',
      },
      {
        icon: 'Activity',
        title: 'Activity',
        href: '/',
      },
      {
        icon: 'Settings2',
        title: 'Preferences',
        href: '/',
      },
    ],
  },
  {
    title: 'Workspaces',
    links: [
      {
        logo: 'A',
        title: 'Acme',
        href: '/',
      },
      {
        icon: 'Plus',
        title: 'Create workspace',
        href: '/',
      },
      {
        icon: 'UserPlus',
        title: 'Invitations',
        href: '/',
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
  return (
    <nav
      className={cn(
        'flex w-56 shrink-0 flex-col gap-y-4 border-r p-4 px-5 lg:w-64 xl:w-72',
        className,
      )}
    >
      <h4 className='font-medium text-lg leading-10'>Settings</h4>

      {menus.map(({ title, links }) => (
        <div className='flex flex-shrink-0 flex-col text-sm'>
          <h6 className='font-medium'>{title}</h6>

          <div className='mt-2 space-y-1'>
            {links?.map(({ icon, logo, title, href }) => {
              return (
                <Link className='flex items-center gap-2.5 py-1.5' href={href}>
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

      <div className='mt-auto flex justify-between space-x-4'>
        <Link
          className='flex items-center gap-x-2 py-2 text-sm'
          href='/sign-in'
        >
          <LogOut className='size-3.5' />
          Sign out
        </Link>

        <Link className='flex items-center py-2' href='/'>
          <MoveLeft className='size-3.5' />
        </Link>
      </div>
    </nav>
  )
}

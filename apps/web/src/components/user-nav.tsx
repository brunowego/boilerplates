'use client'

import type { JSX } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@acme/ui'

import type { User } from '@acme/auth'

import { api } from '@/lib/api'
import { getInitials } from '@/utils'

type UserNavProps = {
  user: User | undefined
}

export default function UserNav({ user }: UserNavProps): JSX.Element {
  const router = useRouter()

  const logout = useMutation({
    mutationFn: async () => {
      await api.post('/auth/log-out')
    },
    onSuccess: () => {
      router.refresh()
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative w-8 h-8 rounded-sm'>
          <Avatar className='w-8 h-8'>
            <AvatarImage alt={user?.full_name} src={user?.picture as string} />

            <AvatarFallback>
              {getInitials({
                firstName: user?.first_name,
                lastName: user?.last_name,
              })}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1.5'>
            <p className='text-sm font-medium leading-none'>
              {user?.full_name}
            </p>

            <p className='text-xs leading-none text-muted-foreground'>
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild={true}>
            <Link className='cursor-pointer' href='/profile'>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem asChild={true}>
            <Link className='cursor-pointer' href='/plans'>
              Plans
              <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className='cursor-pointer'
          onSelect={async () => {
            logout.mutate()
          }}
        >
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

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

import { api } from '@/lib/api'

export function UserNav() {
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
        <Button variant='ghost' className='relative w-8 h-8 rounded-full'>
          <Avatar className='w-8 h-8'>
            <AvatarImage
              src='https://avatar.vercel.sh/sofia-davis.png'
              alt='Sofia Davis'
              className='grayscale'
            />

            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>Sofia Davis</p>

            <p className='text-xs leading-none text-muted-foreground'>
              sofia.davis@example.com
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
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

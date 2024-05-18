'use client'

import type { JSX } from 'react'

import Button, { type ButtonProps } from '@acme/ui/components/button'
import { signOut } from '@acme/auth/react'
import { LogOut as Icon } from '@acme/ui/components/icon'

type LogOutProps = ButtonProps

export default function LogOut({ className }: LogOutProps): JSX.Element {
  return (
    <Button
      className={className}
      onClick={() => signOut({ callbackUrl: '/sign-in' })}
      variant='link'
    >
      <Icon className='size-5 shrink-0' />

      <span className='sr-only'>Log Out</span>
    </Button>
  )
}

'use client'

import { type JSX, useState } from 'react'

import Button, { type ButtonProps } from '@acme/ui/components/button'
import { signOut } from '@acme/auth/react'
import { Loader2, LogOut as LogOutIcon } from '@acme/ui/components/icon'

type LogOutProps = ButtonProps

export default function LogOut({ className }: LogOutProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Button
      className={className}
      onClick={() => {
        setIsLoading(true)
        signOut({ callbackUrl: '/sign-in' })
      }}
      variant='link'
    >
      {isLoading ? (
        <Loader2 className='size-5 animate-spin' />
      ) : (
        <LogOutIcon className='size-5 shrink-0' />
      )}

      <span className='sr-only'>Log Out</span>
    </Button>
  )
}

'use client'

import { type JSX, useState } from 'react'

import Button, { type ButtonProps } from '@acme/ui/components/button'
import { signIn } from '@acme/auth/react'
import { Loader2, MoveRight } from '@acme/ui/components/icon'

type OAuthButtonProps = ButtonProps & {
  provider: 'github' | 'google' | 'linkedin'
}

export default function OAuthButton({
  provider,
  children,
  ...props
}: OAuthButtonProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Button
      className='grid grid-cols-button'
      onClick={() => {
        setIsLoading(true)
        signIn(provider)
      }}
      {...props}
    >
      {children}

      {isLoading ? (
        <Loader2 className='size-5 animate-spin' />
      ) : (
        <MoveRight className='size-4' />
      )}
    </Button>
  )
}

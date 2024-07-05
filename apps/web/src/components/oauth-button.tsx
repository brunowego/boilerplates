'use client'

import { type JSX, useState } from 'react'

import Button, { type ButtonProps } from '@acme/ui/components/button'
import { signIn } from '@acme/auth/react'
import { Loader2 } from '@acme/ui/components/icon'

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
      className='w-full'
      onClick={() => {
        setIsLoading(true)
        signIn(provider)
      }}
      {...props}
    >
      {isLoading ? <Loader2 className='size-5 animate-spin' /> : children}
    </Button>
  )
}

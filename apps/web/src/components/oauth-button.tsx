'use client'

import { type JSX, useState } from 'react'
import { signIn } from 'next-auth/react'

import Button, { type ButtonProps } from '@acme/ui/components/button'
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

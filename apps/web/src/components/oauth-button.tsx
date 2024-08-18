'use client'

import { type JSX, useState } from 'react'

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
      className='md:grid md:grid-cols-[24px_1fr_24px]'
      onClick={() => {
        setIsLoading(true)
      }}
      {...props}
    >
      {children}

      {isLoading ? <Loader2 className='size-5 animate-spin' /> : null}
    </Button>
  )
}

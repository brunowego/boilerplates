'use client'

import type { ComponentProps, JSX } from 'react'

import Sonner from '@acme/ui/providers/sonner'
import useTheme from '@acme/ui/hooks/use-theme'

type SonnerProviderProps = ComponentProps<typeof Sonner>

export default function SonnerProvider({
  ...props
}: SonnerProviderProps): JSX.Element {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as SonnerProviderProps['theme']}
      className='toaster group'
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

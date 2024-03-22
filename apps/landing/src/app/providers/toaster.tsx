'use client'

import type { ComponentProps } from 'react'
import { useTheme } from 'next-themes'

import { Toaster } from '@acme/ui'

type ToasterProviderProps = ComponentProps<typeof Toaster>

export default function ToasterProvider({ ...props }: ToasterProviderProps) {
  const { theme = 'system' } = useTheme()

  return (
    <Toaster
      theme={theme as ToasterProviderProps['theme']}
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

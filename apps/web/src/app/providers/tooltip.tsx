'use client'

import type { ReactNode } from 'react'

import Provider from '@acme/ui/providers/tooltip'

type TooltipProviderProps = {
  children: ReactNode
}

export default function TooltipProvider({ children }: TooltipProviderProps) {
  return <Provider delayDuration={100}>{children}</Provider>
}

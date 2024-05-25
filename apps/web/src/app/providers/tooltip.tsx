'use client'

import type { JSX } from 'react'

import _TooltipProvider, {
  type TooltipProviderProps,
} from '@acme/ui/providers/tooltip'

export default function TooltipProvider({
  children,
  ...props
}: TooltipProviderProps): JSX.Element {
  return <_TooltipProvider {...props}>{children}</_TooltipProvider>
}

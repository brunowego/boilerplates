'use client'

import { type ReactNode, useState } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

export type TooltipProps = {
  children: ReactNode
  content: ReactNode | string
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export default function Tooltip({
  children,
  content,
  side = 'top',
}: TooltipProps) {
  const [open, setOpen] = useState(false)

  return (
    <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
      <TooltipPrimitive.Trigger
        asChild
        onClick={() => {
          setOpen(true)
        }}
        onBlur={() => {
          setOpen(false)
        }}
      >
        {children}
      </TooltipPrimitive.Trigger>

      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          sideOffset={8}
          side={side}
          className='z-[99] animate-slide-up-fade items-center overflow-hidden rounded-md border border-gray-200 bg-white shadow-md'
        >
          {typeof content === 'string' ? (
            <span className='block max-w-xs px-4 py-2 text-center text-gray-700 text-sm'>
              {content}
            </span>
          ) : (
            content
          )}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}

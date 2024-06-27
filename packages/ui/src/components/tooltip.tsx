'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'

import cn from '../utils/cn'

const TooltipRoot = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    className={cn(
      'fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 animate-in overflow-hidden rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-xs data-[state=closed]:animate-out',
      className,
    )}
    ref={ref}
    sideOffset={sideOffset}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

const TooltipArrow = forwardRef<
  ElementRef<typeof TooltipPrimitive.Arrow>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    className={cn('fill-primary', className)}
    ref={ref}
    width={8}
    height={4}
    {...props}
  />
))
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName

type TooltipProps = typeof TooltipRoot & {
  Trigger: typeof TooltipTrigger
  Content: typeof TooltipContent
  Arrow: typeof TooltipArrow
}

const Tooltip = TooltipRoot as TooltipProps

Tooltip.Trigger = TooltipTrigger
Tooltip.Content = TooltipContent
Tooltip.Arrow = TooltipArrow

export default Tooltip

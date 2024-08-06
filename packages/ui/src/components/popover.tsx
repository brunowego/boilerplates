'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'

import cn from '../utils/cn'

const PopoverRoot = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
        className,
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

const PopoverArrow = forwardRef<
  ElementRef<typeof PopoverPrimitive.Arrow>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Arrow
    className={cn('fill-border', className)}
    ref={ref}
    width={12}
    height={6}
    {...props}
  />
))
PopoverArrow.displayName = PopoverPrimitive.Arrow.displayName

type PopoverProps = typeof PopoverRoot & {
  Trigger: typeof PopoverTrigger
  Anchor: typeof PopoverAnchor
  Content: typeof PopoverContent
  Arrow: typeof PopoverArrow
}

const Popover = PopoverRoot as PopoverProps

Popover.Trigger = PopoverTrigger
Popover.Anchor = PopoverAnchor
Popover.Content = PopoverContent
Popover.Arrow = PopoverArrow

export default Popover

'use client'

import * as SheetPrimitive from '@radix-ui/react-dialog'
import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
} from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import cn from '../utils/cn'
import { X } from './icon'

const SheetRoot = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = forwardRef<
  ElementRef<typeof SheetPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-background/80 data-[state=closed]:animate-out data-[state=open]:animate-in',
      className,
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

export const sheetVariants = cva(
  'fixed z-50 gap-4 rounded-md border bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-2 top-2',
        bottom:
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-2 bottom-2',
        left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-2 left-2 w-3/4 sm:max-w-sm',
        right:
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-2 right-2 w-3/4 sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
)

type SheetContentProps = ComponentPropsWithoutRef<
  typeof SheetPrimitive.Content
> &
  VariantProps<typeof sheetVariants>

const SheetContent = forwardRef<
  ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      className={cn(sheetVariants({ side }), className)}
      ref={ref}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className='absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity disabled:pointer-events-none data-[state=open]:bg-secondary hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'>
        <X className='size-4' />

        <span className='sr-only'>Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className,
    )}
    {...props}
  />
)
SheetHeader.displayName = 'SheetHeader'

const SheetFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
)
SheetFooter.displayName = 'SheetFooter'

const SheetTitle = forwardRef<
  ElementRef<typeof SheetPrimitive.Title>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    className={cn('font-semibold text-foreground text-lg', className)}
    ref={ref}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = forwardRef<
  ElementRef<typeof SheetPrimitive.Description>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    ref={ref}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

type SheetProps = typeof SheetRoot & {
  Portal: typeof SheetPortal
  Overlay: typeof SheetOverlay
  Trigger: typeof SheetTrigger
  Close: typeof SheetClose
  Content: typeof SheetContent
  Header: typeof SheetHeader
  Footer: typeof SheetFooter
  Title: typeof SheetTitle
  Description: typeof SheetDescription
}

const Sheet = SheetRoot as SheetProps

Sheet.Portal = SheetPortal
Sheet.Overlay = SheetOverlay
Sheet.Trigger = SheetTrigger
Sheet.Close = SheetClose
Sheet.Content = SheetContent
Sheet.Header = SheetHeader
Sheet.Footer = SheetFooter
Sheet.Title = SheetTitle
Sheet.Description = SheetDescription

export default Sheet

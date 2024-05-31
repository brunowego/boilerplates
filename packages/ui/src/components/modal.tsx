'use client'

import * as ModalPrimitive from '@radix-ui/react-dialog'
import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
} from 'react'

import cn from '../utils/cn'
import { X } from './icon'

const Modal = ModalPrimitive.Root

const ModalTrigger = ModalPrimitive.Trigger

const ModalPortal = ModalPrimitive.Portal

const ModalClose = ModalPrimitive.Close

const ModalOverlay = forwardRef<
  ElementRef<typeof ModalPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof ModalPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Overlay
    className={cn(
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-background/80 data-[state=closed]:animate-out data-[state=open]:animate-in',
      className,
    )}
    ref={ref}
    {...props}
  />
))
ModalOverlay.displayName = ModalPrimitive.Overlay.displayName

const ModalContent = forwardRef<
  ElementRef<typeof ModalPrimitive.Content>,
  ComponentPropsWithoutRef<typeof ModalPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />

    <ModalPrimitive.Content
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-5xl translate-x-[-50%] translate-y-[-50%] bg-secondary p-6 shadow-sm duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:rounded-lg',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}

      <ModalPrimitive.Close className='-right-1 absolute translate-x-full rounded-full p-2.5 opacity-70 ring-offset-background transition-opacity disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none'>
        <X className='size-5' />

        <span className='sr-only'>Close</span>
      </ModalPrimitive.Close>
    </ModalPrimitive.Content>
  </ModalPortal>
))
ModalContent.displayName = ModalPrimitive.Content.displayName

const ModalHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'mb-4 flex flex-col space-y-1.5 text-center sm:text-left',
      className,
    )}
    {...props}
  />
)
ModalHeader.displayName = 'ModalHeader'

const ModalFooter = ({
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
ModalFooter.displayName = 'ModalFooter'

const ModalTitle = forwardRef<
  ElementRef<typeof ModalPrimitive.Title>,
  ComponentPropsWithoutRef<typeof ModalPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Title
    className={cn('font-medium text-xl leading-8 tracking-tight', className)}
    ref={ref}
    {...props}
  />
))
ModalTitle.displayName = ModalPrimitive.Title.displayName

const ModalDescription = forwardRef<
  ElementRef<typeof ModalPrimitive.Description>,
  ComponentPropsWithoutRef<typeof ModalPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    ref={ref}
    {...props}
  />
))
ModalDescription.displayName = ModalPrimitive.Description.displayName

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
}

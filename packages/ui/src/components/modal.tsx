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

const ModalRoot = ModalPrimitive.Root

const ModalTrigger = ModalPrimitive.Trigger

const ModalPortal = ModalPrimitive.Portal

const ModalClose = ModalPrimitive.Close

const ModalOverlay = forwardRef<
  ElementRef<typeof ModalPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof ModalPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Overlay
    className={cn(
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-background/60 data-[state=closed]:animate-out data-[state=open]:animate-in',
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
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-background shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:rounded-lg',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}

      <ModalPrimitive.Close className='absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
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
      'flex flex-col space-y-1.5 rounded-t-[inherit] border-b bg-gradient-to-br from-secondary to-background p-6 text-center sm:text-left',
      className,
    )}
    {...props}
  />
)
ModalHeader.displayName = 'ModalHeader'

const ModalTitle = forwardRef<
  ElementRef<typeof ModalPrimitive.Title>,
  ComponentPropsWithoutRef<typeof ModalPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Title
    className={cn('font-medium text-lg leading-8', className)}
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
    className={cn('text-muted-foreground text-sm leading-6', className)}
    ref={ref}
    {...props}
  />
))
ModalDescription.displayName = ModalPrimitive.Description.displayName

const ModalBody = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6', className)} {...props} />
)
ModalBody.displayName = 'ModalBody'

const ModalFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse px-4 pt-0 pb-4 sm:flex-row sm:justify-end sm:space-x-2 lg:px-6',
      className,
    )}
    {...props}
  />
)
ModalFooter.displayName = 'ModalFooter'

type ModalProps = typeof ModalRoot & {
  Portal: typeof ModalPortal
  Overlay: typeof ModalOverlay
  Trigger: typeof ModalTrigger
  Close: typeof ModalClose
  Content: typeof ModalContent
  Header: typeof ModalHeader
  Title: typeof ModalTitle
  Description: typeof ModalDescription
  Body: typeof ModalBody
  Footer: typeof ModalFooter
}

const Modal = ModalRoot as ModalProps

Modal.Portal = ModalPortal
Modal.Overlay = ModalOverlay
Modal.Trigger = ModalTrigger
Modal.Close = ModalClose
Modal.Content = ModalContent
Modal.Header = ModalHeader
Modal.Title = ModalTitle
Modal.Description = ModalDescription
Modal.Body = ModalBody
Modal.Footer = ModalFooter

export default Modal

'use client'

import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import cn from '../utils/cn'

const AvatarRoot = forwardRef<
  ElementRef<typeof AvatarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    className={cn(
      'relative flex size-10 shrink-0 overflow-hidden rounded-md border',
      className,
    )}
    ref={ref}
    {...props}
  />
))
AvatarRoot.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = forwardRef<
  ElementRef<typeof AvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    className={cn('aspect-square size-full', className)}
    ref={ref}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = forwardRef<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    className={cn(
      'flex size-full items-center justify-center rounded-md bg-input',
      className,
    )}
    ref={ref}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

type AvatarProps = typeof AvatarRoot & {
  Image: typeof AvatarImage
  Fallback: typeof AvatarFallback
}

const Avatar = AvatarRoot as AvatarProps

Avatar.Image = AvatarImage
Avatar.Fallback = AvatarFallback

export default Avatar

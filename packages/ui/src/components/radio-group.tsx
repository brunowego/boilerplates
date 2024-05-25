'use client'

import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { Check } from './icon'

import cn from '../utils/cn'

const RadioGroupRoot = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroupRoot.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'aspect-square size-4 rounded-full border border-primary text-primary shadow disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        className,
      )}
      ref={ref}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
        <Check className='size-3.5 fill-primary' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

type RadioGroupProps = typeof RadioGroupRoot & {
  Item: typeof RadioGroupItem
}

const RadioGroup = RadioGroupRoot as RadioGroupProps

RadioGroup.Item = RadioGroupItem

export default RadioGroup

'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'

import cn from '../utils/cn'
import { Check, ChevronDown } from './icon'

const AccordionCard = forwardRef<
  ElementRef<typeof AccordionPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root
    className={cn('space-y-2', className)}
    ref={ref}
    {...props}
  />
))
AccordionCard.displayName = 'Accordion'

const AccordionCardItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    className={cn(
      'rounded-md border px-4 data-[state=open]:border-foreground hover:border-foreground',
      className,
    )}
    ref={ref}
    {...props}
  />
))
AccordionCardItem.displayName = 'AccordionItem'

type AccordionCardTriggerProps = ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> & {
  checked?: boolean
}

const AccordionCardTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionCardTriggerProps
>(({ className, children, checked, ...props }, ref) => (
  <AccordionPrimitive.Header className='flex'>
    <AccordionPrimitive.Trigger
      className={cn(
        'flex flex-1 items-center justify-between py-4 font-medium transition-all',
        !checked ? '[&[data-state=open]>svg]:rotate-180' : null,
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}

      {checked ? (
        <Check className='size-4 shrink-0 text-green-500' />
      ) : (
        <ChevronDown className='size-4 shrink-0 text-muted-foreground transition-transform duration-200' />
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionCardTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionCardContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    className='overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
    ref={ref}
    {...props}
  >
    <div className={cn('pt-0 pb-4', className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionCardContent.displayName = AccordionPrimitive.Content.displayName

export {
  AccordionCard,
  AccordionCardItem,
  AccordionCardTrigger,
  AccordionCardContent,
}

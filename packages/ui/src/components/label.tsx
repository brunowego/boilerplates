'use client'

import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'

import cn from '../utils/cn'

const labelVariants = cva(
  'flex items-center gap-x-1.5 font-medium text-sm leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    className={cn(labelVariants(), className)}
    ref={ref}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label as default, labelVariants }

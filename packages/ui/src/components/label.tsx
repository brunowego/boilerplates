'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

import cn from '../utils/cn'

const labelVariants = cva(
  'font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

type LabelProps = ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>

const Label = forwardRef<ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root
      className={cn(labelVariants(), className)}
      ref={ref}
      {...props}
    />
  ),
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label as default, type LabelProps }

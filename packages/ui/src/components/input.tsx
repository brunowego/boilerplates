import { cva, type VariantProps } from 'class-variance-authority'
import { type InputHTMLAttributes, forwardRef } from 'react'

import cn from '../utils/cn'

export const inputVariants = cva(
  'flex h-12 w-full rounded-md border border bg-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
)

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants(), className)}
        ref={ref}
        type={type}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input as default, type InputProps }

import { cva, type VariantProps } from 'class-variance-authority'
import { type InputHTMLAttributes, forwardRef } from 'react'

const inputVariants = cva(
  'flex h-10 w-full rounded-md border bg-input px-4 py-1 text-sm transition-colors disabled:cursor-not-allowed file:border-0 focus-visible:border-white file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground disabled:opacity-50 focus-visible:outline-none',
)

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        className={inputVariants({ className })}
        ref={ref}
        type={type}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input as default, inputVariants }

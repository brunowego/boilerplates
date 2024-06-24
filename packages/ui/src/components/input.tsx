import { cva, type VariantProps } from 'class-variance-authority'
import { type InputHTMLAttributes, forwardRef } from 'react'

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-white px-4 py-1 text-sm transition-colors disabled:cursor-not-allowed file:border-0 focus-visible:border-white dark:bg-secondary file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground disabled:opacity-50 focus-visible:outline-none',
)

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>

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

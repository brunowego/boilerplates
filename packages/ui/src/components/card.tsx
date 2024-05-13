import { type HTMLAttributes, forwardRef } from 'react'

import cn from '../lib/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  mode?: 'card' | 'flat'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ mode, className, ...props }, ref) => (
    <div
      className={cn(
        mode === 'card'
          ? 'rounded-md border bg-card text-card-foreground shadow-xs'
          : '',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
)
Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      ref={ref}
      {...props}
    />
  ),
)
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    className={cn('font-semibold leading-none tracking-tight', className)}
    ref={ref}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    className={cn('text-muted-foreground text-sm', className)}
    ref={ref}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn('p-6 pt-0', className)} ref={ref} {...props} />
  ),
)
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      className={cn('flex items-center p-6 pt-0', className)}
      ref={ref}
      {...props}
    />
  ),
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
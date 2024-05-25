import { forwardRef, type HTMLAttributes } from 'react'

import cn from '../utils/cn'

const CardRoot = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      className={cn(
        'rounded-md bg-card text-card-foreground shadow-md',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
)
CardRoot.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      className={cn('flex flex-col space-y-1.5 p-4 lg:px-5', className)}
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
    <div className={cn('p-4 lg:px-5', className)} ref={ref} {...props} />
  ),
)
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      className={cn('flex items-center p-4 lg:px-5', className)}
      ref={ref}
      {...props}
    />
  ),
)
CardFooter.displayName = 'CardFooter'

type CardProps = typeof CardRoot & {
  Header: typeof CardHeader
  Title: typeof CardTitle
  Description: typeof CardDescription
  Content: typeof CardContent
  Footer: typeof CardFooter
}

const Card = CardRoot as CardProps

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter

export default Card

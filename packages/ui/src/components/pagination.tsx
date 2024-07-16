import { type ComponentProps, forwardRef } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons'

import cn from '../utils/cn'
import { type ButtonProps, buttonVariants } from './button'

const Pagination = ({ className, ...props }: ComponentProps<'nav'>) => (
  <nav
    aria-label='pagination'
    className={cn('mx-auto flex w-full justify-center', className)}
    role='navigation'
    {...props}
  />
)
Pagination.displayName = 'Pagination'

const PaginationContent = forwardRef<HTMLUListElement, ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul
      className={cn('flex flex-row items-center gap-1', className)}
      ref={ref}
      {...props}
    />
  ),
)
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
  ),
)
PaginationItem.displayName = 'PaginationItem'

type PaginationButtonProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  ComponentProps<'button'>

const PaginationButton = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationButtonProps) => (
  <button
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      className,
    )}
    {...props}
  />
)
PaginationButton.displayName = 'PaginationButton'

const PaginationPrevious = ({
  className,
  ...props
}: ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label='Go to previous page'
    className={cn('gap-1 pl-2.5', className)}
    size='default'
    {...props}
  >
    <ChevronLeftIcon className='size-4' />

    <span>Previous</span>
  </PaginationButton>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({
  className,
  ...props
}: ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label='Go to next page'
    size='default'
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <span>Next</span>

    <ChevronRightIcon className='size-4' />
  </PaginationButton>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({
  className,
  ...props
}: ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <DotsHorizontalIcon className='size-4' />

    <span className='sr-only'>More pages</span>
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

Pagination.Content = PaginationContent
Pagination.Button = PaginationButton
Pagination.Item = PaginationItem
Pagination.Previous = PaginationPrevious
Pagination.Next = PaginationNext
Pagination.Ellipsis = PaginationEllipsis

export default Pagination

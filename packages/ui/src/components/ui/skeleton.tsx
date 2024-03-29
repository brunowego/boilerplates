import type { HTMLAttributes } from 'react'

import { cn } from '../../lib/utils'

export default function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <span
      className={cn('block animate-pulse rounded-md bg-primary/10', className)}
      {...props}
    />
  )
}

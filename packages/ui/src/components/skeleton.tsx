import type { JSX, HTMLAttributes } from 'react'

import cn from '../utils/cn'

function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-border/50', className)}
      {...props}
    />
  )
}

export { Skeleton as default }

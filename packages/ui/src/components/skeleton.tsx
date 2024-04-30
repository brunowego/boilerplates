import type { JSX, HTMLAttributes } from 'react'

import cn from '../lib/cn'

type SkeletonProps = HTMLAttributes<HTMLDivElement>

export default function Skeleton({
  className,
  ...props
}: SkeletonProps): JSX.Element {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-primary/10', className)}
      {...props}
    />
  )
}

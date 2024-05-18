import type { HTMLAttributes } from 'react'

import cn from '../utils/cn'

type SkeletonProps = HTMLAttributes<HTMLDivElement>

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-primary/10', className)}
      {...props}
    />
  )
}
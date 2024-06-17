import type { JSX } from 'react'

import cn from '@acme/ui/utils/cn'
import Skeleton from '@acme/ui/components/skeleton'

type LoadingProps = {
  className?: string
}

export default function Loading({ className }: LoadingProps): JSX.Element {
  return (
    <div className={cn('flex items-center space-x-4', className)}>
      <div className='flex grow items-center space-x-3'>
        <Skeleton className='size-8' />

        <Skeleton className='h-4 w-32' />
      </div>

      <Skeleton className='h-5 w-9 rounded-full' />
    </div>
  )
}

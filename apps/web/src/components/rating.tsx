import type { JSX } from 'react'

import cn from '@acme/ui/utils/cn'
import { Star } from '@acme/ui/components/icon'

type RatingProps = {
  className?: string
  rating: number
}

export default function Rating({
  className,
  rating,
}: RatingProps): JSX.Element {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1

        return (
          <Star
            className={cn(
              'size-5',
              ratingValue <= rating
                ? 'fill-yellow-300 stroke-yellow-300'
                : 'fill-border stroke-border',
            )}
            // biome-ignore lint/suspicious/noArrayIndexKey: This is a demo
            key={index}
          />
        )
      })}
    </div>
  )
}

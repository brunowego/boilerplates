import type { JSX } from 'react'

import { Star } from '@acme/ui/components/icon'
import cn from '@acme/ui/utils/cn'

type RatingButtonProps = {
  rating: number
  onRatingChange: (newRating: number) => void
}

export default function RatingButton({
  rating,
  onRatingChange,
}: RatingButtonProps): JSX.Element {
  return (
    <div className='space-x-0.5'>
      {new Array(5).fill('').map((_, index) => (
        <button
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a static array
          key={index}
          onClick={() => onRatingChange(index + 1)}
          type='button'
        >
          <Star
            className={cn(
              'size-5 transition-all hover:scale-125',
              rating >= index + 1
                ? 'fill-yellow-300 stroke-yellow-300'
                : 'fill-border stroke-border',
            )}
          />
        </button>
      ))}
    </div>
  )
}

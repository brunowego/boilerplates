'use client'

import { type JSX, useState } from 'react'

import Label from '@acme/ui/components/label'

import RatingButton from '@/components/rating-button'
import Recommendation from '@/components/recommendation'
import Answered from '@/components/answered'

export default function Components(): JSX.Element {
  const [rating, setRating] = useState(3)

  return (
    <>
      <div className='space-y-2'>
        <Label>Rating</Label>

        <RatingButton
          onRatingChange={(newRating) => setRating(newRating)}
          rating={rating}
        />
      </div>

      <div className='space-y-2'>
        <Label>Was this page helpful?</Label>

        <Recommendation />
      </div>

      <div className='space-y-2'>
        <Label>Did this answer your question?</Label>

        <Answered />
      </div>
    </>
  )
}

'use client'

import { type JSX, useState, type FormEventHandler } from 'react'

import Button from '@acme/ui/components/button'

import RatingButton from '@/components/rating-button'
import Label from '@acme/ui/components/label'
import Textarea from '@acme/ui/components/textarea'
import Checkbox from '@acme/ui/components/checkbox'

export type ProductReviewPostPayload = {
  review: string
  title: string
  recommending: boolean
  product_id: string
  rating: number
  added_at: string
}

export type ProductReview = {
  id: string
  user_id: number
  full_name: string
  product_id: string
  product_name: string
  review: string
  rating: number
  // gender: string;
  // age: string;
  // skintype: string;
  added_at: string
  title: string
  recommending: boolean
}

function formatDateTime(date: Date) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return formatter.format(date)
}

type RatingFormProps = {
  productId: string
  onAddReview: (review: ProductReviewPostPayload) => Promise<
    | {
        ok: true
        productReview: ProductReview
      }
    | {
        ok: false
        message: string
      }
  >
}

export default function RatingForm({
  productId,
  onAddReview,
}: RatingFormProps): JSX.Element {
  const [rating, setRating] = useState(3)
  const [wizard, setWizard] = useState<
    | {
        type: 'initial'
      }
    | {
        type: 'loading'
      }
    | {
        type: 'error'
        message: string
      }
  >({ type: 'initial' })

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    if (rating === 0) {
      return setWizard({ type: 'error', message: 'Rating Mandatory!' })
    }

    const form = event.currentTarget

    setWizard({ type: 'loading' })

    try {
      const review: ProductReviewPostPayload = {
        review: event.currentTarget.review.value as string,
        title: event.currentTarget.reviewTitle.value as string,
        recommending: event.currentTarget.recommending.checked as boolean,
        product_id: productId,
        added_at: formatDateTime(new Date()),
        rating: rating,
      }

      const resp = await onAddReview(review)

      if (resp.ok === false) {
        setWizard({ type: 'error', message: resp.message })
      } else {
        form.reset()
        setWizard({ type: 'initial' })
      }
    } catch (err) {
      console.error(err)

      setWizard({ type: 'error', message: 'Failed to add review' })
    }
  }
  return (
    <form className='space-y-4' onSubmit={onSubmit}>
      <div className='space-y-2'>
        <Label>Rating</Label>

        <RatingButton
          onRatingChange={(newRating) => setRating(newRating)}
          rating={rating}
        />
      </div>

      <div className='space-y-2'>
        <Label>Your review</Label>

        <Textarea className='max-w-md' />
      </div>

      <div className='flex items-center space-x-2'>
        <Label htmlFor='recommending'>Do you recomand this product?</Label>

        <Checkbox id='recommending' />
      </div>

      {wizard.type === 'error' && (
        <p className='font-bold text-red-500'>{wizard.message}</p>
      )}

      <Button className='w-full max-w-md' size='lg' type='submit'>
        {wizard.type === 'loading' ? 'Loading...' : 'Submit'}
      </Button>
    </form>
  )
}

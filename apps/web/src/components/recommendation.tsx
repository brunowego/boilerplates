'use client'

import { type JSX, useState, useEffect } from 'react'

import { ThumbsDown, ThumbsUp } from '@acme/ui/components/icon'
import { buttonVariants } from '@acme/ui'

export default function Recommendation(): JSX.Element {
  const [recommendation, setRecommendation] = useState<string>('')

  const handleRecommendation = (value: string) => {
    setRecommendation(value)

    localStorage.setItem('recommendation', value)
  }

  useEffect(() => {
    const storedRecommendation = localStorage.getItem('recommendation')

    if (storedRecommendation) {
      setRecommendation(storedRecommendation)
    }
  }, [])

  return (
    <div className='flex items-center space-x-2'>
      <button
        className={buttonVariants({
          className: 'gap-x-2',
          variant: recommendation === 'yes' ? 'default' : 'ghost',
        })}
        onClick={() => handleRecommendation('yes')}
        type='button'
      >
        <ThumbsUp className='size-4 flex-shrink-0' />
        Yes
      </button>

      <button
        className={buttonVariants({
          className: 'gap-x-2',
          variant: recommendation === 'no' ? 'destructive' : 'ghost',
        })}
        onClick={() => handleRecommendation('no')}
        type='button'
      >
        <ThumbsDown className='size-4 flex-shrink-0' />
        No
      </button>
    </div>
  )
}

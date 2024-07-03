'use client'

import { cn } from '@acme/ui'
import { useEffect, useState } from 'react'

export default function Answered() {
  const [answered, setAnswered] = useState<string>('')

  const handleAnswered = (value: string) => {
    setAnswered(value)

    localStorage.setItem('answered', value)
  }

  useEffect(() => {
    const storedAnswered = localStorage.getItem('answered')

    if (storedAnswered) {
      setAnswered(storedAnswered)
    }
  }, [])

  return (
    <div className='flex items-center space-x-1'>
      <button
        className={cn(
          'size-10 items-center justify-center rounded-full border border-transparent text-2xl disabled:pointer-events-none disabled:opacity-50',
          answered === 'not-good' ? 'border-border' : null,
        )}
        onClick={() => handleAnswered('not-good')}
        type='button'
      >
        <span className='inline-flex align-middle transition-transform hover:scale-125'>
          😔
        </span>
      </button>

      <button
        className={cn(
          'size-10 items-center justify-center rounded-full border border-transparent text-2xl disabled:pointer-events-none disabled:opacity-50',
          answered === 'neutral' ? 'border-border' : null,
        )}
        onClick={() => handleAnswered('neutral')}
        type='button'
      >
        <span className='inline-flex align-middle transition-transform hover:scale-125'>
          😐️
        </span>
      </button>

      <button
        className={cn(
          'size-10 items-center justify-center rounded-full border border-transparent text-2xl disabled:pointer-events-none disabled:opacity-50',
          answered === 'good' ? 'border-border' : null,
        )}
        onClick={() => handleAnswered('good')}
        type='button'
      >
        <span className='inline-flex align-middle transition-transform hover:scale-125'>
          🤩
        </span>
      </button>
    </div>
  )
}

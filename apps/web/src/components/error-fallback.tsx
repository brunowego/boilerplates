'use client'

import type { JSX } from 'react'
import { useRouter } from 'next/navigation'

import Button from '@acme/ui/components/button'

export default function ErrorFallback(): JSX.Element {
  const router = useRouter()

  return (
    <div className='flex h-full flex-col items-center justify-center space-y-4'>
      <h2 className='text-md'>Something went wrong...</h2>

      <Button onClick={() => router.refresh()} variant='outline'>
        Try again
      </Button>
    </div>
  )
}

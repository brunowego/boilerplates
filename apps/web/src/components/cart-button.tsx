'use client'

import type { JSX } from 'react'
import { useFormStatus } from 'react-dom'

import { Loader2, ShoppingBag } from '@acme/ui/components/icon'

export default function CartButton(): JSX.Element {
  const { pending } = useFormStatus()

  return (
    <button className='align-middle' type='submit'>
      {pending ? (
        <Loader2 className='size-6 animate-spin' />
      ) : (
        <ShoppingBag className='size-6' />
      )}

      <span className='sr-only'>Cart</span>
    </button>
  )
}

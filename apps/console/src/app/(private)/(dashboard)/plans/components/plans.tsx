'use client'

import type { JSX } from 'react'

import { useGetProfile } from '@/hooks/api/use-profile'

import Pricing from './pricing'

export default function Plans(): JSX.Element {
  const { data: user } = useGetProfile()

  return (
    <Pricing
      user={user}
      // products={products ?? []}
      // subscription={subscription}
    />
  )
}

'use client'

import type { JSX } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import type { Appearance } from '@stripe/stripe-js'

import getStripe from '@/lib/stripe/client'
import { convertToSubcurrency } from '@/utils'

import CheckoutForm from './checkout-form'

type CheckoutProps = {
  amount: number
}

export default function Checkout({ amount }: CheckoutProps): JSX.Element {
  const appearance: Appearance = {
    theme: 'stripe',
  }

  return (
    <Elements
      stripe={getStripe()}
      options={{
        mode: 'payment',
        currency: 'usd',
        amount: convertToSubcurrency(amount),
        appearance,
      }}
    >
      <CheckoutForm amount={amount} />
    </Elements>
  )
}

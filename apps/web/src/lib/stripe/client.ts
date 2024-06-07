import { type Stripe, loadStripe } from '@stripe/stripe-js'

import { publicEnv as penv } from '@/env/client'

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(penv.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  }

  return stripePromise
}

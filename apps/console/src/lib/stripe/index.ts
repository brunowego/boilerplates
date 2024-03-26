import 'server-only'

import Stripe from 'stripe'

import { serverEnv as senv } from '@/env/server'

export const stripe = new Stripe(senv.STRIPE_SECRET_KEY as string, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Next.js with Subscription',
    url: 'https://github.com/brunowego/boilerplates',
    version: '0.0.0',
  },
})

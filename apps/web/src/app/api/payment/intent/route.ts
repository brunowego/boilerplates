import Stripe from 'stripe'
import { type NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  typescript: true,
  apiVersion: '2024-06-20',
})

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json()

    if (typeof amount !== 'number') {
      throw new Error('Invalid amount.')
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.error(err)

    return new Response(null, {
      status: 500,
    })
  }
}

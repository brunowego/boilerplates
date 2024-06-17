import { redirect } from 'next/navigation'

import type { CartItem } from '@/types'
import { stripe } from '@/lib/stripe'

export async function redirectToPaymentLink(items: CartItem[]) {
  const paymentLink = await stripe.paymentLinks.create({
    line_items: items.map((item) => ({
      price: item.price.id,
      quantity: item.quantity,
    })),
    after_completion: {
      type: 'redirect',
      redirect: {
        url: 'http://localhost:3000',
      },
    },
    shipping_address_collection: {
      allowed_countries: ['SE'],
    },
    // shipping_options: [
    //   {
    //     shipping_rate: 'shr_1NX8QlGLM4u3hshrv3MjMqgm',
    //   },
    // ],
  })

  redirect(paymentLink.url)
}

import type { JSX } from 'react'

// import type { CartItem } from '@/types'

// import { redirectToPaymentLink } from '../app/(store)/actions'
import CartButton from './cart-button'

export default async function Cart(): Promise<JSX.Element> {
  // const goToCheckout = async (items: CartItem[]) => {
  //   'use server'

  //   await redirectToPaymentLink(items)
  // }

  // async function redirectToPayment() {
  //   await goToCheckout([])
  // }

  return (
    <form
    // action={redirectToPayment}
    >
      <CartButton />
    </form>
  )
}

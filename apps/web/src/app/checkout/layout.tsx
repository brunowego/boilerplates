import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

export const metadata: Metadata = {
  title: 'Checkout',
}

interface CheckoutLayoutProps {
  children: ReactNode
}

export default async function CheckoutLayout({
  children,
}: CheckoutLayoutProps): Promise<JSX.Element> {
  return <>{children}</>
}

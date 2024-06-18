'use client'

import type { JSX } from 'react'

import { usePayment } from '@/hooks/api/use-payment'

import EditPaymentForm from './edit-payment-form'

export default function EditPayment(): JSX.Element {
  const { data: payment, isLoading } = usePayment()

  // FIXME: Replace with a proper loading component
  if (isLoading) {
    return <div>Loading...</div>
  }

  console.error('payment', payment)

  return <EditPaymentForm isLoading={isLoading} payment={payment} />
}

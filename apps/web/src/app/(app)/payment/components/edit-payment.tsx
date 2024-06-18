'use client'

import type { JSX } from 'react'

import { usePayment } from '@/hooks/api/use-payment'

import EditPaymentForm from './edit-payment-form'

export default function EditPayment(): JSX.Element {
  const { data: payment, isLoading } = usePayment()

  return <EditPaymentForm isLoading={isLoading} payment={payment} />
}

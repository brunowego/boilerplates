'use client'

import type { JSX } from 'react'

import { usePaymentMethods } from '@/hooks/api/use-payment-methods'

import EditPaymentForm from './edit-payment-form'

export default function EditPayment(): JSX.Element {
  const { data: payment, isLoading } = usePaymentMethods()

  return <EditPaymentForm isLoading={isLoading} payment={payment} />
}

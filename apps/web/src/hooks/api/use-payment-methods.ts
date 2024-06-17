import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import type { PaymentMethod } from '@acme/db/types'

import api from '@/lib/api'

const paymentMethodKeys = {
  getPaymentMethods: () => ['payment_methods'] as const,
  getPaymentMethod: (paymentMethodId: string) =>
    ['payment_methods', paymentMethodId] as const,
}

const fetchPaymentMethod = async (paymentMethodId: string) => {
  return (await api
    .get(`payment_methods/${paymentMethodId}`)
    .then((res) => res.data)) as Promise<PaymentMethod>
}

const fetchPaymentMethods = async () => {
  return (await api.get('payment_methods').then((res) => res.data)) as Promise<
    PaymentMethod[]
  >
}

export const usePaymentMethod = ({
  paymentMethodId,
}: { paymentMethodId: string }): UseQueryResult<
  PaymentMethod | undefined,
  Error
> => {
  return useQuery({
    queryKey: paymentMethodKeys.getPaymentMethod(paymentMethodId),
    queryFn: () => fetchPaymentMethod(paymentMethodId),
  })
}

export const usePaymentMethods = (): UseQueryResult<
  PaymentMethod[] | undefined,
  Error
> => {
  return useQuery({
    queryKey: paymentMethodKeys.getPaymentMethods(),
    queryFn: () => fetchPaymentMethods(),
  })
}

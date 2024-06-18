import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import type { Payment } from '@acme/db/types'

import api from '@/lib/api'

const paymentKeys = {
  getPayment: () => ['payment'] as const,
}

const fetchPayment = async () => {
  return (await api.get('payment').then((res) => res.data)) as Promise<Payment>
}

export const usePayment = (): UseQueryResult<Payment | undefined, Error> => {
  return useQuery({
    queryKey: paymentKeys.getPayment(),
    queryFn: () => fetchPayment(),
  })
}

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useDebouncedCallback } from '@react-hookz/web'

import api from '@/lib/api'

export type ValidationState = 'idle' | 'loading' | 'success' | 'invalid'

export type Address = {
  state: string
  city: string
  neighborhood: string
  street: string
  type?: string
}

export default function useDebouncedZipCodeAddress(): {
  data: Address | null
  validation: ValidationState
  onStartCheckValidation: () => void
  onCheckValidation: (zipCode: string) => void
  onResetValidation: () => void
} {
  const [validation, setValidation] = useState<ValidationState>('idle')
  const [data, setData] = useState<Address | null>(null)

  const checkValidation = useMutation({
    mutationKey: ['zip-code'],

    mutationFn: async (zipCode: string) => {
      return api.get(`/addresses/br/zip/${zipCode}`)
    },

    onSuccess: (res) => {
      if (validation !== 'idle') {
        setValidation(res.status !== 404 ? 'success' : 'invalid')
        setData(res.data)
      }
    },

    onError: () => {
      if (validation !== 'idle') {
        setValidation('invalid')
      }
    },
  })

  const onCheckValidation = useDebouncedCallback(
    checkValidation.mutate,
    [checkValidation.mutate],
    1000,
  )

  const onStartCheckValidation = () => {
    setValidation('loading')
  }

  const onResetValidation = () => {
    setValidation('idle')
  }

  return {
    data,
    validation,
    onStartCheckValidation,
    onCheckValidation,
    onResetValidation,
  }
}

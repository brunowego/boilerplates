import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useDebouncedCallback } from '@react-hookz/web'

import { api } from '@/lib/api'

export type AvailabilityState = 'idle' | 'loading' | 'success' | 'invalid'

export default function useDebouncedUsernameAvailability(): {
  availability: AvailabilityState
  onStartCheckAvailability: () => void
  onCheckAvailability: (username: string) => void
  onResetAvailability: () => void
} {
  const [availability, setAvailability] = useState<AvailabilityState>('idle')

  const checkAvailability = useMutation({
    mutationKey: ['check-avaibility'],

    mutationFn: async (username: string) => {
      return api
        .get(`/check/username?q=${username}`)
        .then((res) => res.data.available)
    },

    onSuccess: (valid) => {
      if (availability !== 'idle') {
        setAvailability(valid ? 'success' : 'invalid')
      }
    },

    onError: () => {
      if (availability !== 'idle') {
        setAvailability('invalid')
      }
    },
  })

  const onCheckAvailability = useDebouncedCallback(
    checkAvailability.mutate,
    [checkAvailability.mutate],
    1000,
  )

  const onStartCheckAvailability = () => {
    setAvailability('loading')
  }

  const onResetAvailability = () => {
    setAvailability('idle')
  }

  return {
    availability,
    onStartCheckAvailability,
    onCheckAvailability,
    onResetAvailability,
  }
}

'use client'

import type { JSX } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/api'

export function Logout(): JSX.Element {
  const router = useRouter()

  const logout = useMutation({
    mutationFn: async () => {
      await api.post('/auth/log-out')
    },
    onSuccess: () => {
      router.refresh()
    },
  })

  return (
    <button
      onClick={async () => {
        logout.mutate()
      }}
      type='button'
    >
      Log out
    </button>
  )
}

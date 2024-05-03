'use client'

import type { JSX } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import Button from '@acme/ui/components/button'
import { LogOut as Icon } from '@acme/ui/components/icon'

import { axios } from '@/lib/api'

type LogOutProps = {
  className?: string
}

export default function LogOut({ className }: LogOutProps): JSX.Element {
  const { refresh } = useRouter()

  const { mutate } = useMutation({
    mutationFn: async () => {
      await axios.post('/log-out')
    },
    onSuccess: () => {
      refresh()
    },
  })

  return (
    <Button className={className} onClick={() => mutate()} variant='link'>
      <Icon className='size-5 shrink-0' />

      <span className='sr-only'>Log Out</span>
    </Button>
  )
}

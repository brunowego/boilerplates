'use client'

import type { JSX } from 'react'

import { useMe } from '@/hooks/api/use-me'

export default function Me(): JSX.Element {
  const { data: user, isLoading } = useMe()

  if (isLoading) {
    return <>Loading...</>
  }

  return <pre className='text-sm'>{JSON.stringify(user, null, 2)}</pre>
}

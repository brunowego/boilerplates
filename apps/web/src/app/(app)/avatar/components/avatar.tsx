'use client'

import type { JSX } from 'react'

import Avatar from '@acme/ui/components/avatar'

export default function _Avatar(): JSX.Element {
  return (
    <Avatar>
      <Avatar.Image src='https://github.com/shadcn.png' />

      <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar>
  )
}

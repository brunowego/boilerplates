'use client'

import type { JSX } from 'react'

import ColorInput from '@acme/ui/components/color-input'

export default function Editor(): JSX.Element {
  return (
    <ColorInput
      className='flex max-w-56 gap-x-2'
      value='#b8e986'
      onChange={() => {}}
    />
  )
}

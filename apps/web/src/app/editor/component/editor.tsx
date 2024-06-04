'use client'

import type { JSX } from 'react'

import ColorInput from '@acme/ui/components/color-input'
import Input from '@acme/ui/components/input'

export default function Editor(): JSX.Element {
  return (
    <>
      <ColorInput
        className='flex max-w-56 gap-x-2'
        value='#b8e986'
        onChange={() => {}}
      />

      <div className='mb-2' />

      <div className='flex max-w-56 items-center space-x-2'>
        <div
          className='size-9 shrink-0 rounded-sm'
          style={{ backgroundColor: '#b8e986' }}
        />

        <Input value='#b8e986' />
      </div>
    </>
  )
}

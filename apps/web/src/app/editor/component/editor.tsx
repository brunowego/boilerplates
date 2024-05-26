'use client'

import { type JSX, useState } from 'react'

import GradientPicker from '@acme/ui/components/gradient-picker'

export default function Editor(): JSX.Element {
  const [background, setBackground] = useState('#B4D455')

  return (
    <div
      className='flex h-full min-h-[350px] w-full items-center justify-center rounded bg-center bg-cover p-10 transition-all'
      style={{ background }}
    >
      <GradientPicker
        background={background}
        className='w-[220px]'
        setBackground={setBackground}
      />
    </div>
  )
}

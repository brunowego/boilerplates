import type { JSX } from 'react'

import { Input } from '@acme/ui'

export default function Search(): JSX.Element {
  return (
    <div>
      <Input
        type='search'
        placeholder='Search...'
        className='md:w-[100px] lg:w-[300px]'
      />
    </div>
  )
}

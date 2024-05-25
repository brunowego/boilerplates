import type { JSX } from 'react'

import Puck from '@/lib/puck'

export default function PuckFields(): JSX.Element {
  return (
    <>
      <div className='p-4'>
        <h2 className='font-medium leading-8'>Fields</h2>
      </div>

      <Puck.Fields />
    </>
  )
}

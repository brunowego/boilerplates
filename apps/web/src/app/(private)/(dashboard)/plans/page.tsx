import type { JSX } from 'react'

import Plans from './components/plans'

export default function PlansPage(): JSX.Element {
  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold tracking-tight leading-10'>Plans</h2>
      </div>

      <Plans />
    </>
  )
}

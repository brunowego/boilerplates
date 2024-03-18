import type { JSX } from 'react'

import { Form } from './components'

export default function ProfilePage(): JSX.Element {
  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold tracking-tight leading-10'>
          Profile
        </h2>
      </div>

      <Form />
    </>
  )
}

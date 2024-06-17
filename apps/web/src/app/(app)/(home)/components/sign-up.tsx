import type { JSX } from 'react'

import SignUpForm from './sign-up-form'

export default function SignUp(): JSX.Element {
  return (
    <div className='p-4 lg:px-5'>
      <SignUpForm
        user={{
          phoneNumber: '',
        }}
      />
    </div>
  )
}

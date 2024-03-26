import Link from 'next/link'

import { typographyVariants } from '@acme/ui'

import { UserRegisterForm } from './components'

import type { JSX } from 'react'

export default function SignInPage(): JSX.Element {
  return (
    <>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Get Started with Acme
        </h1>

        <p
          className={typographyVariants({
            className: 'text-sm leading-relaxed',
            variant: 'muted',
          })}
        >
          Already have an account?{' '}
          <Link className='dark:text-white' href='/sign-in'>
            <span className='font-medium'>Sign in</span>
          </Link>
        </p>
      </div>

      <UserRegisterForm />
    </>
  )
}

import Link from 'next/link'

import { typographyVariants } from '@acme/ui'

import { UserAuthForm } from './components'

import type { JSX } from 'react'

export default function SignInPage(): JSX.Element {
  return (
    <>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Sign in to Acme
        </h1>

        <p
          className={typographyVariants({
            className: 'text-sm leading-relaxed',
            variant: 'muted',
          })}
        >
          Don't have an account?{' '}
          <Link className='dark:text-white' href='/sign-up'>
            <span className='font-medium'>Get started</span>
          </Link>
        </p>
      </div>

      <UserAuthForm />
    </>
  )
}

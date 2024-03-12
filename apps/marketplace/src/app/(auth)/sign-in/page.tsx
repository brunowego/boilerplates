'use client'

import { type JSX, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { typographyVariants } from '@acme/ui'

import { redirect } from './actions'
import { UserAuthForm } from './components'

type SignInPageProps = {
  searchParams: {
    redirect_uri: string
  }
}

export default function SignInPage({
  searchParams,
}: SignInPageProps): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    if (searchParams.redirect_uri) {
      void redirect(searchParams.redirect_uri)

      router.replace('/sign-in', undefined)
    }
  }, [searchParams.redirect_uri, router])

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

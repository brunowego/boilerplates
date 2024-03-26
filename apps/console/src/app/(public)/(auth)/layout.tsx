import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { Icon, Logo, buttonVariants } from '@acme/ui'

import { getCachedSession } from '@/lib/auth/session'

export const metadata: Metadata = {
  title: 'Auth',
}

interface AuthLayoutProps {
  children: ReactNode
}

export default async function AuthLayout({
  children,
}: AuthLayoutProps): Promise<JSX.Element> {
  const { user } = await getCachedSession()

  if (user) {
    return redirect('/')
  }

  return (
    <div className='container md:grid lg:grid-cols-2 h-screen items-center hidden'>
      <div className='absolute inset-0 bg-zinc-900 -translate-x-1/2' />
      <div className='hidden relative flex-col p-10 h-full text-white lg:flex dark:border-r bg-muted'>
        <div className='absolute inset-0 bg-zinc-900' />

        <div className='flex z-20 items-center text-lg font-medium'>
          <Icon.command className='mr-2 w-6 h-6' />
          Acme Inc
        </div>

        <div className='z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>

            <footer className='text-sm'>Sofia Davis</footer>
          </blockquote>
        </div>
      </div>

      <div className='lg:p-8'>
        <div className='flex flex-col justify-center mx-auto space-y-6 w-full sm:w-[350px]'>
          {children}

          <div className='relative'>
            <div className='flex absolute inset-0 items-center'>
              <span className='w-full border-t' />
            </div>

            <div className='flex relative justify-center text-xs uppercase'>
              <span className='px-2 bg-background text-muted-foreground'>
                Or continue with
              </span>
            </div>
          </div>

          <div className='flex flex-col space-y-2'>
            <Link
              className={buttonVariants({ variant: 'outline' })}
              href='/sign-in/google'
              prefetch={false}
            >
              <Logo.google className='mr-2 w-4 h-4' />

              <span>Google</span>
            </Link>

            <Link
              className={buttonVariants({ variant: 'outline' })}
              href='/sign-in/github'
              prefetch={false}
            >
              <Logo.gitHub className='mr-2 w-4 h-4' />

              <span>GitHub</span>
            </Link>
          </div>

          <p className='px-8 text-sm text-center text-muted-foreground'>
            By clicking continue, you agree to our{' '}
            <Link
              href='/terms'
              className='underline underline-offset-4 hover:text-primary'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy'
              className='underline underline-offset-4 hover:text-primary'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

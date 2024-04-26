import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import Link from 'next/link'

import { LogoMark } from '@acme/ui/components/logo'

import {
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutAside,
} from '@/components/layout'
import LogOut from '@/components/log-out'
import ThemeToggle from '@/components/theme-toggle'

export const metadata: Metadata = {
  title: 'Onboarding',
}

const steps = [
  {
    title: 'Account creation',
    completed: true,
  },
  {
    title: 'General',
    completed: true,
  },
  {
    title: 'Connect your data',
  },
  {
    title: 'Verify',
  },
]

type OnboardLayoutProps = {
  children: ReactNode
}

export default async function OnboardLayout({
  children,
}: OnboardLayoutProps): Promise<JSX.Element> {
  return (
    <Layout>
      <LayoutHeader>
        <Link className='self-center py-1' href='/'>
          <LogoMark className='size-8' />
        </Link>

        <LogOut className='mt-auto' />

        <ThemeToggle className='self-center' />
      </LayoutHeader>

      <LayoutContent>{children}</LayoutContent>

      <LayoutAside className='p-4 lg:px-5'>
        <div className='font-semibold text-muted-foreground text-xs uppercase'>
          Welcome to Acme
        </div>

        <div className='font-medium text-xl leading-loose'>Get started</div>

        <div className='relative'>
          <div className='absolute top-4 bottom-4 left-4 w-px bg-border' />

          <div
            className='absolute top-4 left-4 w-px bg-green-600'
            style={{ height: 'calc(50% - 3.5rem)' }}
          />

          <div className='md:-ml-3 relative flex gap-4 overflow-hidden md:flex-col md:gap-8'>
            <div className='flex flex-shrink-0 items-center gap-2 self-start px-3 py-1.5'>
              <div className='relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm text-white'>
                <div className='absolute inset-0 z-0 rounded-full bg-green-600' />

                <div className='relative'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width={14}
                    height={14}
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='lucide lucide-check-check '
                  >
                    <path d='M18 6 7 17l-5-5' />
                    <path d='m22 10-7.5 7.5L13 16' />
                  </svg>
                </div>
              </div>

              <div className='font-medium text-sm'>Account creation</div>
            </div>

            {steps.map((step, index) => (
              <div className='flex flex-shrink-0 items-center gap-2 self-start rounded-xl bg-background px-3 py-1.5'>
                <div className='relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm text-white'>
                  <div className='absolute inset-0 z-0 rounded-full bg-green-600' />
                  <div className='absolute inset-1 z-0 animate-ping-slow rounded-full bg-green-600' />

                  <div className='relative'>2</div>
                </div>

                <div className='font-medium text-sm'>General</div>
              </div>
            ))}

            <div className='flex flex-shrink-0 items-center gap-2 self-start px-3 py-1.5'>
              <div className='relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm'>
                <div className='absolute inset-0 z-0 rounded-full bg-border' />

                <div className='relative'>3</div>
              </div>

              <div className='font-medium text-sm'>Connect your data</div>
            </div>

            <div className='flex flex-shrink-0 items-center gap-2 self-start px-3 py-1.5'>
              <div className='relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm'>
                <div className='absolute inset-0 z-0 rounded-full bg-border' />

                <div className='relative'>4</div>
              </div>

              <div className='font-medium text-sm'>Verify</div>
            </div>
          </div>
        </div>
      </LayoutAside>
    </Layout>
  )
}

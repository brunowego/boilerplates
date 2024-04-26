import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import Link from 'next/link'

import { LogoMark } from '@acme/ui/components/logo'
import { CheckCheck } from '@acme/ui/components/icon'
import cn from '@acme/ui/lib/cn'

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
    current: true,
  },
  {
    title: 'Connect your data',
  },
  {
    title: 'Verify',
  },
] as Array<{ title: string; completed?: boolean; current?: boolean }>

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

          <div className='md:-ml-3 relative flex flex-col gap-4 overflow-hidden lg:gap-8'>
            {steps.map(({ completed, current, title }, index) => (
              <div
                className={cn(
                  'flex flex-shrink-0 items-center gap-3 self-start px-3 py-2',
                  current ? 'bg-background' : null,
                )}
                // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
                key={index}
              >
                <div className='relative flex size-8 shrink-0 items-center justify-center rounded-full text-sm'>
                  <div
                    className={cn(
                      'absolute inset-0 z-0 rounded-full',
                      completed || current ? 'bg-green-600' : 'bg-border',
                    )}
                  />
                  {current ? (
                    <div className='absolute inset-1 z-0 animate-ping rounded-full bg-green-600' />
                  ) : null}

                  <div className='relative'>
                    {completed ? <CheckCheck className='size-4' /> : index + 1}
                  </div>
                </div>

                <div className='font-medium text-sm'>{title}</div>
              </div>
            ))}
          </div>
        </div>
      </LayoutAside>
    </Layout>
  )
}

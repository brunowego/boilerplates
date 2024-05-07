import type { Metadata } from 'next'
import type { JSX } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { LogoMark } from '@acme/ui/components/logo'
import Button, { buttonVariants } from '@acme/ui/components/button'

import { auth } from '@/lib/auth'
import { Layout, LayoutContent, LayoutHeader } from '@/components/layout'
import ThemeToggle from '@/components/theme-toggle'
import { typographyVariants } from '@acme/ui'

export const metadata: Metadata = {
  title: 'Goodbye',
}

export default async function GoodbyePage(): Promise<JSX.Element> {
  const session = await auth()

  if (!session?.user) {
    return redirect('/')
  }

  return (
    <Layout>
      <LayoutHeader>
        <Link className='self-center py-1' href='/'>
          <LogoMark className='size-8' />
        </Link>

        <ThemeToggle className='mt-auto self-center' />
      </LayoutHeader>

      <LayoutContent>
        <article className='flex min-h-screen items-center justify-center overflow-hidden p-6 md:p-0'>
          <section className='m-auto flex w-full max-w-md flex-col space-y-6 p-4 lg:px-5'>
            <div className='flex flex-col space-y-4'>
              <h1
                className={typographyVariants({
                  className:
                    'dark:bg-gradient-to-r dark:from-primary dark:via-lime-300 dark:to-lime-400 dark:bg-clip-text dark:text-transparent',
                  variant: 'h1',
                })}
              >
                Thanks for trying out Acme
              </h1>

              <p
                className={typographyVariants({ size: 'xl', variant: 'muted' })}
              >
                You&apos;ve successfully deleted your account. If you need
                additional support or have a question, please contact us at
                Discord!
              </p>

              <p
                className={typographyVariants({ size: 'xl', variant: 'muted' })}
              >
                Before you go, you can give your feedback on the public beta -
                tell us what you liked and didn&apos;t like!
              </p>
            </div>

            <Button size='lg'>Send Feedback</Button>
          </section>
        </article>
      </LayoutContent>
    </Layout>
  )
}

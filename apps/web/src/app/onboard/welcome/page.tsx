import type { JSX } from 'react'
import Link from 'next/link'

import { Page, PageHeader, PageContent } from '@/components/page'
import Button, { buttonVariants } from '@acme/ui/components/button'
import Image from 'next/image'

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <PageHeader className='flex border-b-0'>
        <Button className='ml-auto' variant='ghost'>
          Logout
        </Button>
      </PageHeader>

      <PageContent>
        <div className='mx-auto max-w-xl'>
          <div className='flex flex-col items-center justify-center gap-8'>
            <Image
              alt='Celebrate'
              className='shrink-0'
              src='/static/img/celebrate.svg'
              width={456}
              height={376}
            />

            <div className='flex max-w-[448px] flex-col items-center gap-2'>
              <h1 className='text-3xl'>Welcome to Tailwarden!</h1>

              <p className='text-center text-muted-foreground text-sm'>
                You are off to a great start. Do not forget to join our discord
                to get updates on what is new at Tailwarden!
              </p>
            </div>

            <div className='flex items-center gap-x-4'>
              <Link
                className={buttonVariants()}
                href='/'
                target='_blank'
                rel='noreferrer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  width={16}
                  height={16}
                  className='mr-2'
                >
                  <title>Discord</title>
                  <path
                    fill='currentColor'
                    d='M18.93 4.936a16.457 16.457 0 00-4.07-1.266.062.062 0 00-.066.03c-.175.314-.37.723-.506 1.045a15.182 15.182 0 00-4.573 0c-.136-.329-.338-.73-.515-1.044a.064.064 0 00-.065-.031 16.412 16.412 0 00-4.07 1.266.058.058 0 00-.028.023c-2.593 3.885-3.303 7.674-2.954 11.416a.069.069 0 00.026.047 16.567 16.567 0 004.994 2.532.065.065 0 00.07-.023 11.89 11.89 0 001.022-1.667.064.064 0 00-.035-.088 10.905 10.905 0 01-1.56-.746.064.064 0 01-.007-.107c.105-.078.21-.16.31-.243a.062.062 0 01.065-.009c3.273 1.499 6.817 1.499 10.051 0a.061.061 0 01.066.008c.1.083.205.166.31.244a.064.064 0 01-.005.107c-.499.292-1.017.539-1.561.745a.064.064 0 00-.034.09c.3.582.643 1.138 1.02 1.665a.063.063 0 00.07.024 16.512 16.512 0 005.003-2.532.065.065 0 00.026-.046c.417-4.327-.699-8.085-2.957-11.416a.05.05 0 00-.026-.024zm-10.247 9.16c-.985 0-1.797-.907-1.797-2.021 0-1.114.796-2.022 1.797-2.022 1.01 0 1.813.916 1.798 2.022 0 1.114-.796 2.022-1.798 2.022zm6.646 0c-.986 0-1.797-.907-1.797-2.021 0-1.114.796-2.022 1.797-2.022 1.009 0 1.813.916 1.797 2.022 0 1.114-.788 2.022-1.797 2.022z'
                  />
                </svg>
                Join us on Discord
              </Link>

              <Link className='px-4 text-sm' href='/'>
                Explore Tailwarden
              </Link>
            </div>
          </div>
        </div>
      </PageContent>
    </Page>
  )
}

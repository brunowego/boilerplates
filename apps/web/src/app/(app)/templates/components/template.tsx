import type { JSX } from 'react'
import Link from 'next/link'

import { ArrowLeft } from '@acme/ui/components/icon'
import Button from '@acme/ui/components/button'

import { Page, PageContent } from '@/components/page'

export default function Template(): JSX.Element {
  return (
    <Page>
      <PageContent className='grid h-full grid-cols-5 gap-x-4'>
        <div className='col-span-2 space-y-4 border-r p-4 lg:px-5'>
          <Link
            className='flex items-center gap-x-2 text-muted-foreground text-sm transition-colors hover:text-foreground'
            href='/templates'
          >
            <ArrowLeft className='size-4' /> Back to Templates
          </Link>

          <h3 className='font-semibold text-6xl leading-tight'>
            Custom Template
          </h3>

          <p>Apply this template to your project in seconds.</p>

          <div className='flex space-x-4 *:flex-1'>
            <Button>Start with this template</Button>
            <Button variant='outline'>View Demo</Button>
          </div>

          <ul className='divide-y text-sm *:flex *:justify-between *:leading-10'>
            <li>
              <span>Customizable</span>
              <span className='text-muted-foreground'>Yes</span>
            </li>

            <li>
              <span>Extensible</span>
              <span className='text-muted-foreground'>Yes</span>
            </li>

            <li>
              <span>Price</span>
              <span className='text-muted-foreground'>Free</span>
            </li>
          </ul>
        </div>

        <div className='col-span-3 overflow-scroll'>
          <div className='h-full rounded-sm border bg-secondary' />
        </div>
      </PageContent>
    </Page>
  )
}

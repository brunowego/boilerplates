import type { JSX } from 'react'

import Page from '@acme/ui/components/page'
import { typographyVariants } from '@acme/ui/components/typography'
import Button from '@acme/ui/components/button'
import { GitHub } from '@acme/ui/components/logo'
import { ArrowRight } from '@acme/ui/components/icon'

export default function ButtonPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <h1
          className={typographyVariants({
            className: 'leading-8',
            variant: 'title',
          })}
        >
          Button
        </h1>
      </Page.Header>

      <Page.Content className='space-y-2'>
        <Button className='group w-full overflow-hidden'>
          <div className='-translate-x-0 group-hover:-translate-x-6 group-focus-visible:-translate-x-6 inline-flex w-full transition'>
            <GitHub className='group-hover:-translate-x-6 group-focus-visible:-translate-x-6 absolute size-5 translate-x-0 opacity-100 transition group-hover:opacity-0' />

            <span className='w-full text-sm'>Continue with GitHub</span>

            <ArrowRight className='absolute right-0 size-5 translate-x-12 opacity-0 transition group-focus-visible:translate-x-6 group-hover:translate-x-6 group-hover:opacity-100' />
          </div>
        </Button>

        <Button className='group w-full overflow-hidden' variant='secondary'>
          <div className='-translate-x-0 group-hover:-translate-x-6 group-focus-visible:-translate-x-6 inline-flex w-full transition'>
            <GitHub className='group-hover:-translate-x-6 group-focus-visible:-translate-x-6 absolute size-5 translate-x-0 opacity-100 transition group-hover:opacity-0' />

            <span className='w-full text-sm'>Continue with GitHub</span>

            <ArrowRight className='absolute right-0 size-5 translate-x-12 opacity-0 transition group-focus-visible:translate-x-6 group-hover:translate-x-6 group-hover:opacity-100' />
          </div>
        </Button>

        <Button className='group w-full overflow-hidden' variant='outline'>
          <div className='-translate-x-0 group-hover:-translate-x-6 group-focus-visible:-translate-x-6 inline-flex w-full transition'>
            <GitHub className='group-hover:-translate-x-6 group-focus-visible:-translate-x-6 absolute size-5 translate-x-0 opacity-100 transition group-hover:opacity-0' />

            <span className='w-full text-sm'>Continue with GitHub</span>

            <ArrowRight className='absolute right-0 size-5 translate-x-12 opacity-0 transition group-focus-visible:translate-x-6 group-hover:translate-x-6 group-hover:opacity-100' />
          </div>
        </Button>

        <Button className='group w-full overflow-hidden' variant='ghost'>
          <div className='-translate-x-0 group-hover:-translate-x-6 group-focus-visible:-translate-x-6 inline-flex w-full transition'>
            <GitHub className='group-hover:-translate-x-6 group-focus-visible:-translate-x-6 absolute size-5 translate-x-0 opacity-100 transition group-hover:opacity-0' />

            <span className='w-full text-sm'>Continue with GitHub</span>

            <ArrowRight className='absolute right-0 size-5 translate-x-12 opacity-0 transition group-focus-visible:translate-x-6 group-hover:translate-x-6 group-hover:opacity-100' />
          </div>
        </Button>

        <Button className='group w-full overflow-hidden' variant='destructive'>
          <div className='-translate-x-0 group-hover:-translate-x-6 group-focus-visible:-translate-x-6 inline-flex w-full transition'>
            <GitHub className='group-hover:-translate-x-6 group-focus-visible:-translate-x-6 absolute size-5 translate-x-0 opacity-100 transition group-hover:opacity-0' />

            <span className='w-full text-sm'>Continue with GitHub</span>

            <ArrowRight className='absolute right-0 size-5 translate-x-12 opacity-0 transition group-focus-visible:translate-x-6 group-hover:translate-x-6 group-hover:opacity-100' />
          </div>
        </Button>
      </Page.Content>
    </Page>
  )
}

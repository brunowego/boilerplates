import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'
import EmptyState from '@acme/ui/components/empty-state'

import { Page, PageHeader, PageContent } from '@/components/page'

import EditSiteSheet from './components/edit-site-sheet'

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <PageHeader>
        <h1
          className={typographyVariants({
            className: 'leading-8',
            variant: 'title',
          })}
        >
          Acme
        </h1>

        <div className='flex gap-x-2'>
          <EditSiteSheet />
        </div>
      </PageHeader>

      <PageContent>
        <div className='relative mt-4'>
          <div className='grid grid-cols-5 gap-x-4'>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                className='aspect-square rounded-t-md border border-dashed bg-secondary'
                // biome-ignore lint/suspicious/noArrayIndexKey: This is static placeholder content
                key={index}
              />
            ))}
          </div>

          <div className='absolute inset-y-0 w-full bg-gradient-to-b from-transparent to-background' />
        </div>

        <EmptyState
          className='-mt-56 relative'
          emoji='🎨'
          title='Add a website to your account'
          description='Increase the visibility of your business with a professional website!'
        />
      </PageContent>
    </Page>
  )
}

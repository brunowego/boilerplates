import type { JSX } from 'react'

import { Page, PageContent, PageHeader } from '@/components/page'

import Gallery from './components/gallery'

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <PageHeader>
        <h2 className='font-medium text-lg'>Gallery</h2>

        <p className='text-muted-foreground text-sm'>Add images to product.</p>
      </PageHeader>

      <PageContent>
        <Gallery />
      </PageContent>
    </Page>
  )
}

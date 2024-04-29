import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'

import { Page, PageContent, PageHeader } from '@/components/page'

import Gallery from './components/gallery'

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <PageHeader>
        <h2 className={typographyVariants({ variant: 'title' })}>Gallery</h2>

        <p className={typographyVariants({ variant: 'subtitle' })}>
          Add images to product.
        </p>
      </PageHeader>

      <PageContent>
        <Gallery />
      </PageContent>
    </Page>
  )
}

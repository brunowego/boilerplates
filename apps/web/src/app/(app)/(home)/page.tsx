import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'

import { Page, PageContent, PageHeader } from '@/components/page'

import Product from './components/product'

type HomePageProps = {
  params: {
    productId: string
  }
}

export default function HomePage({ params }: HomePageProps): JSX.Element {
  return (
    <Page>
      <PageHeader>
        <h2 className={typographyVariants({ variant: 'title' })}>Gallery</h2>

        <p className={typographyVariants({ variant: 'subtitle' })}>
          Add images to product.
        </p>
      </PageHeader>

      <PageContent>
        <Product productId={params.productId} />
      </PageContent>
    </Page>
  )
}

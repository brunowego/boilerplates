import type { JSX } from 'react'
import Link from 'next/link'

import { typographyVariants } from '@acme/ui/components/typography'
import EmptyState from '@acme/ui/components/empty-state'
import { buttonVariants } from '@acme/ui/components/button'

import { Page, PageHeader, PageContent } from '@/components/page'
import Tldr from '@/components/tldr'

import AddProductModal from './components/add-product-modal'

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
          Products
        </h1>
      </PageHeader>

      <PageContent>
        <div className='relative'>
          <div className='grid grid-cols-5 gap-x-4'>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                className='aspect-square rounded-t-md border border-dashed bg-border/15'
                // biome-ignore lint/suspicious/noArrayIndexKey: This is static placeholder content
                key={index}
              />
            ))}
          </div>

          <div className='absolute inset-y-0 w-full bg-gradient-to-b from-transparent to-background' />
        </div>

        <EmptyState
          className='-mt-40 relative'
          emoji='🎨'
          title='Add your first product'
          description='Empower your platform by seamlessly adding products.'
        >
          <AddProductModal
            title='Add product'
            subtitle={
              <Tldr
                message='Manage stakeholders by adding them.
          Categorize, assign roles, and maintain contact info for investors, partners, and clients.'
                cta={{
                  label: 'Learn more',
                  href: 'https://acme.tld/help',
                }}
              />
            }
            trigger={
              <button
                className={buttonVariants({ className: 'mx-auto px-10' })}
                type='button'
              >
                Add one product
              </button>
            }
          />
        </EmptyState>
      </PageContent>
    </Page>
  )
}

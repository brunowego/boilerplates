import type { JSX } from 'react'
import Link from 'next/link'

import Badge from '@acme/ui/components/badge'
import { Plus, MoveRight } from '@acme/ui/components/icon'

import { Page, PageContent, PageHeader } from '@/components/page'

export default function Templates(): JSX.Element {
  return (
    <Page>
      <PageHeader className='flex items-center justify-between space-x-4'>
        <div className='flex items-center space-x-3'>
          <h2 className='text-xl leading-10'>Acme</h2>

          <Badge className='rounded-full'>Unpublished</Badge>
        </div>

        {/* <button className='p-2' type='button'>
          <X />
        </button> */}
      </PageHeader>

      <PageContent>
        <p className='mb-4 text-muted-foreground'>
          Select one of the templates below, or if you prefer, start from
          scratch. You can also clone existing pages.
        </p>

        <div className='flex items-center justify-between'>
          <h3 className='mb-2 leading-10'>Templates</h3>

          <Link
            className='flex items-center gap-x-2 text-muted-foreground text-sm hover:text-foreground'
            href='/'
          >
            See all (5) <MoveRight className='size-4' />
          </Link>
        </div>

        <div className='grid grid-cols-5 gap-x-4'>
          <Link
            className='relative flex aspect-square items-center justify-center rounded-sm border border-dashed text-muted-foreground text-sm transition-colors hover:border-primary hover:text-primary'
            href='/'
          >
            <div className='flex items-center gap-x-2'>
              <Plus className='size-4' />
              Start from scratch
            </div>
          </Link>

          {Array.from({ length: 4 }).map((_, index) => (
            <Link
              className='group aspect-square rounded-sm border bg-secondary px-3 py-2'
              href='/templates/custom-template'
              // biome-ignore lint/suspicious/noArrayIndexKey: This is static template content
              key={index}
            >
              <Badge className='hidden rounded-[2px] group-hover:inline-flex'>
                Custom Template
              </Badge>
            </Link>
          ))}
        </div>
      </PageContent>

      <PageContent>
        <h3 className='mb-2 leading-10'>My pages</h3>

        <div className='grid grid-cols-5 gap-x-4'>
          {Array.from({ length: 3 }).map((_, index) => (
            <Link
              className='group aspect-square rounded-sm border bg-secondary px-3 py-2'
              href='/'
              // biome-ignore lint/suspicious/noArrayIndexKey: This is static template content
              key={index}
            >
              <Badge className='hidden rounded-[2px] group-hover:inline-flex'>
                Home
              </Badge>
            </Link>
          ))}
        </div>
      </PageContent>
    </Page>
  )
}

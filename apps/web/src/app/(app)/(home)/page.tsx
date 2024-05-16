import type { JSX } from 'react'
import Link from 'next/link'

import Badge from '@acme/ui/components/badge'
import EmptyState from '@acme/ui/components/empty-state'
import { buttonVariants } from '@acme/ui/components/button'

import { Page, PageHeader } from '@/components/page'

export default function HomePage(): JSX.Element {
  return (
    <>
      <Page>
        <PageHeader className='flex items-center justify-between space-x-4'>
          <div className='flex items-center space-x-3'>
            <h2 className='text-xl leading-10'>Acme</h2>

            <Badge className='rounded-full'>Unpublished</Badge>
          </div>
        </PageHeader>

        <div className='flex-1 p-4 px-5'>
          <div className='relative'>
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
            title='Add pages the platform'
            description='Empower your platform by seamlessly adding pages.'
          >
            <Link
              className={buttonVariants({ className: 'mx-auto px-10' })}
              href='/templates'
            >
              Add first page
            </Link>
          </EmptyState>
        </div>
      </Page>
    </>
  )
}

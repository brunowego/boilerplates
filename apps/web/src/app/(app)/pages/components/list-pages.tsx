'use client'

import { type JSX, Suspense } from 'react'
import Link from 'next/link'

import Skeleton from '@acme/ui/components/skeleton'
import EmptyState from '@acme/ui/components/empty-state'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@acme/ui/components/card'

import { usePages } from '@/hooks/api/use-pages'
import { buttonVariants } from '@acme/ui'

export default function ListPages(): JSX.Element {
  const { data: pages, isLoading } = usePages()

  if (isLoading) {
    return (
      <div className='relative'>
        <div className='grid grid-cols-5 gap-x-4'>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              className='aspect-square rounded-t-md border border-dashed'
              // biome-ignore lint/suspicious/noArrayIndexKey: This is static placeholder content
              key={index}
            />
          ))}
        </div>

        <div className='absolute inset-y-0 w-full bg-gradient-to-b from-transparent to-background' />
      </div>
    )
  }

  if (pages?.length === 0) {
    return (
      <>
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
          className='-mt-56 relative'
          emoji='🎨'
          title='Add your first page'
          description='Empower your platform by seamlessly adding pages.'
        >
          <Link
            className={buttonVariants({ className: 'mx-auto px-10' })}
            href='/pages/new'
          >
            Create a page
          </Link>
        </EmptyState>
      </>
    )
  }

  return (
    <div className='grid grid-cols-5 gap-4'>
      {pages?.map(({ id, title, handle }) => (
        <Suspense key={id}>
          <Link href={`/pages/${id}/edit`}>
            <Card className='aspect-square'>
              <CardHeader>
                <CardTitle>{title}</CardTitle>

                <CardDescription>{handle}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </Suspense>
      ))}

      <Link href={'/pages/new'}>
        <Card className='aspect-square'>
          <CardHeader>
            <CardTitle>New Landing page</CardTitle>
          </CardHeader>
        </Card>
      </Link>
    </div>
  )
}

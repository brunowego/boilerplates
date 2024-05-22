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

import { useFiles } from '@/hooks/api/use-files'
import { buttonVariants } from '@acme/ui'

export default function ListPages(): JSX.Element {
  const { data: files, isLoading } = useFiles()

  if (isLoading) {
    return (
      <div className='relative'>
        <div className='grid grid-cols-6 gap-x-4'>
          {Array.from({ length: 6 }).map((_, index) => (
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

  if (files?.length === 0) {
    return (
      <>
        <div className='relative'>
          <div className='grid grid-cols-6 gap-x-4'>
            {Array.from({ length: 6 }).map((_, index) => (
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
          className='-mt-48 relative'
          emoji='🎨'
          title='Add your first file'
          description='Empower your platform by seamlessly adding files.'
        >
          <Link
            className={buttonVariants({ className: 'mx-auto px-10' })}
            href='/files/upload'
          >
            Upload files
          </Link>
        </EmptyState>
      </>
    )
  }

  return (
    <div className='grid grid-cols-6 gap-4'>
      {files?.map(({ id, title, filename }) => (
        <Suspense key={id}>
          <Card className='aspect-square'>
            <CardHeader>
              <CardTitle>{title}</CardTitle>

              <CardDescription>{filename}</CardDescription>
            </CardHeader>
          </Card>
        </Suspense>
      ))}

      <Link href={'/files/new'}>
        <Card className='aspect-square'>
          <CardHeader>
            <CardTitle>Upload file</CardTitle>
          </CardHeader>
        </Card>
      </Link>
    </div>
  )
}

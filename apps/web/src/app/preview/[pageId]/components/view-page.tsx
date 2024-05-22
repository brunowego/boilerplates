'use client'

import type { JSX } from 'react'
import { notFound } from 'next/navigation'

import { Render, config, type Data } from '@acme/puck'

import { usePage } from '@/hooks/api/use-pages'

type ViewPageProps = {
  pageId: string
}

export default function ViewPage({ pageId }: ViewPageProps): JSX.Element {
  const { data: page, isLoading } = usePage({ pageId })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!page) {
    return notFound()
  }

  // @ts-ignore
  return <Render config={config} data={page.data as Data} />
}

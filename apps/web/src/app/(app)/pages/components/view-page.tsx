'use client'

import type { JSX } from 'react'
import { notFound } from 'next/navigation'
import { Render as PuckRender } from '@measured/puck'

import { usePage } from '@/hooks/api/use-pages'
import { config } from '@/lib/puck'

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
  return <PuckRender config={config} data={page.data} />
}

'use client'

import type { JSX } from 'react'

import slugify from '@acme/ui/lib/slugify'
import toast from '@acme/ui/lib/toast'
import Puck, { type Data, config } from '@/lib/puck'
import Page from '@acme/ui/components/page'

import { usePage } from '@/hooks/api/use-pages'
import api from '@/lib/api'

import CustomPuck from './custom-puck'

type EditPageProps = {
  pageId: string
}

export default function EditPage({ pageId }: EditPageProps): JSX.Element {
  const { data: page, isLoading } = usePage({ pageId })

  const handleSave = async (data: Data) => {
    try {
      api
        .patch(`/pages/${page?.id}`, {
          title: data.root.props?.title,
          handle: slugify(data.root.props?.title as string),
          data,
        })
        .then(() => {
          toast.success('Page saved')
        })
        .catch((err) => {
          console.error(err)
        })
    } catch (err) {
      console.error(err)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Page>
      <Puck
        config={config}
        // @ts-ignore
        data={page?.data}
        overrides={{
          puck: () => (
            <CustomPuck
              data={page?.data as Data}
              // pageId={pageId}
              onPublish={handleSave}
            />
          ),
        }}
      />
    </Page>
  )
}

'use client'

import type { JSX } from 'react'
// import { useMutation } from '@tanstack/react-query'
import { Puck, type Data } from '@measured/puck'
import '@measured/puck/puck.css'

import toast from '@acme/ui/lib/toast'
import slugify from '@acme/ui/lib/slugify'

import { usePage } from '@/hooks/api/use-pages'
import api from '@/lib/api'
import { Page } from '@/components/page'
import { config } from '@/lib/puck'
import CustomPuck from '@/components/custom-puck'

type EditPageProps = {
  pageId: string
}

export default function EditPage({ pageId }: EditPageProps): JSX.Element {
  const { data: page, isLoading } = usePage({ pageId })

  // const { mutateAsync } = useMutation({
  //   mutationFn: (data: Data) => {
  //     return api.patch(`/pages/${page?.id}`, { data })
  //   },
  //   // onError: (error) => {},
  //   // onSuccess: () => {},
  // })

  const handleSave = async (data: Data) => {
    try {
      // await mutateAsync(data)

      api
        .patch(`/pages/${page?.id}`, {
          title: data.root.title,
          handle: slugify(data.root.title as string),
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
          puck: () => <CustomPuck pageId={pageId} onPublish={handleSave} />,
        }}
      />
    </Page>
  )
}

'use client'

import type { JSX } from 'react'
// import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import toast from '@acme/ui/lib/toast'
import Puck, { type Data, config, CustomPuck } from '@acme/puck'
import '@acme/puck/styles.css'

import api from '@/lib/api'
import { Page } from '@/components/page'

export default function NewPage(): JSX.Element {
  const { push } = useRouter()

  const handleSave = async (data: Data) => {
    try {
      api
        .post('/pages', { title: 'Test', handle: 'test', data })
        .then(({ data }) => {
          toast.success('Page created')

          push(`/pages/${data.id}/edit`)
        })
        .catch((err) => {
          console.error(err)
        })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Page>
      <Puck
        config={config}
        data={{
          content: [],
          root: {
            props: {
              title: 'New Page',
            },
          },
          zones: {},
        }}
        overrides={{
          puck: () => <CustomPuck onPublish={handleSave} />,
        }}
      />
    </Page>
  )
}

'use client'

import type { JSX } from 'react'
// import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type Data, Puck } from '@measured/puck'
import '@measured/puck/puck.css'

import toast from '@acme/ui/lib/toast'

import api from '@/lib/api'
import { Page } from '@/components/page'
import { config } from '@/lib/puck'
import CustomPuck from '@/components/custom-puck'

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
        // @ts-ignore
        data={{
          content: [],
          root: {},
          zones: {},
        }}
        overrides={{
          puck: () => <CustomPuck onPublish={handleSave} />,
        }}
      />
    </Page>
  )
}

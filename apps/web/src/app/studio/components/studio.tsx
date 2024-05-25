'use client'

import type { JSX } from 'react'
import { useRouter } from 'next/navigation'

import slugify from '@acme/ui/lib/slugify'
import toast from '@acme/ui/lib/toast'

import Puck, { type Data, config } from '@/lib/puck'
import api from '@/lib/api'

import CustomPuck from './custom-puck'

export default function Studio(): JSX.Element {
  const { push } = useRouter()

  const handleSave = async (data: Data) => {
    try {
      api
        .post('/pages', {
          title: data.root.props?.title,
          handle: slugify(data.root.props?.title as string),
          data,
        })
        .then(({ data }) => {
          toast.success('Page created')

          push(`/studio/${data.id}`)
        })
        .catch((err) => {
          console.error(err)
        })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Puck
      config={config}
      data={{
        content: [],
        root: {},
        zones: {},
      }}
      overrides={{
        puck: () => <CustomPuck onPublish={handleSave} />,
      }}
    />
  )
}

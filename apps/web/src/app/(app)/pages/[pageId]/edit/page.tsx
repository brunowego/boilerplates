import type { JSX } from 'react'

import { default as Edit } from '../../components/edit-page'

type EditPageProps = {
  params: {
    pageId: string
  }
}

export default function EditPage({ params }: EditPageProps): JSX.Element {
  return <Edit pageId={params.pageId} />
}

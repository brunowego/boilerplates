import type { JSX } from 'react'

import { default as View } from './components/view-page'

type ViewPageProps = {
  params: {
    pageId: string
  }
}

export default function ViewPage({ params }: ViewPageProps): JSX.Element {
  return (
    <div className='container'>
      <View pageId={params.pageId} />
    </div>
  )
}

import type { JSX } from 'react'

import EditGalleryForm from './edit-gallery-form'

export default function Gallery(): JSX.Element {
  return (
    <EditGalleryForm
      gallery={{
        images: [],
      }}
    />
  )
}

import type { JSX } from 'react'

import GalleryForm from './gallery-form'

export default function Gallery(): JSX.Element {
  return (
    <GalleryForm
      gallery={{
        images: [],
      }}
    />
  )
}

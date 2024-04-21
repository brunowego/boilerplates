import type { JSX } from 'react'

import GalleryForm from './gallery-form'

export default function Gallery(): JSX.Element {
  return (
    <div className='p-4 lg:px-5'>
      <h2 className='font-medium text-lg'>Gallery</h2>

      <p className='text-muted-foreground text-sm'>Add images to product.</p>

      <div className='mt-4' />

      <GalleryForm
        gallery={{
          images: [],
        }}
      />
    </div>
  )
}

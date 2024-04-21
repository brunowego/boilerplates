import type { JSX } from 'react'

import DocumentForm from './document-form'

export default function Document(): JSX.Element {
  return (
    <div className='p-4 lg:px-5'>
      <h2 className='font-medium text-lg'>Document</h2>

      <p className='text-muted-foreground text-sm'>Add your documents.</p>

      <div className='mt-4' />

      <DocumentForm document={{ resume: '' }} />
    </div>
  )
}

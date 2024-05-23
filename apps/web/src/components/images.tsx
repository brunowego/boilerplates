import type { JSX } from 'react'

import Button from '@acme/ui/components/button'
import { Upload } from '@acme/ui/components/icon'

export default function Images(): JSX.Element {
  return (
    <>
      <div className='p-4 lg:px-5'>
        <h2 className='font-medium leading-8'>Images</h2>
      </div>

      <div className='border-b p-4 lg:px-5'>
        <p className='mb-4 text-muted-foreground text-sm'>
          Upload an image to use on your page.
        </p>

        <Button className='w-full space-x-2' size='sm' variant='secondary'>
          <Upload className='size-4' />
          <span>Upload image</span>
        </Button>
      </div>

      <div className='p-4 lg:px-5'>
        <h3 className='mb-4 font-medium text-sm'>Search</h3>

        <p className='text-muted-foreground text-sm'>
          Images uploaded by you will be displayed here.
        </p>
      </div>
    </>
  )
}

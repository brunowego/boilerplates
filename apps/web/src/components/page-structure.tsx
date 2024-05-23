import type { JSX } from 'react'

export default function PageStructure(): JSX.Element {
  return (
    <>
      <div className='p-4 lg:px-5'>
        <h2 className='font-medium leading-8'>Page structure</h2>
      </div>

      <div className='p-4 lg:px-5'>
        <p className='mb-4 text-muted-foreground text-sm'>
          Add, organize, and edit your page structures.
        </p>

        <h3 className='mb-4 font-medium text-sm'>Sections</h3>

        <p className='text-muted-foreground text-sm'>
          Click and drag to change the sections' position on your page. To
          rename any of them, double-click on the correspondent title below.
        </p>
      </div>
    </>
  )
}

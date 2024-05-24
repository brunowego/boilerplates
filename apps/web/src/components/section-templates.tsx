import type { JSX } from 'react'

import { categories } from '@/data'

export default function SectionTemplates(): JSX.Element {
  return (
    <>
      <div className='p-4 lg:px-5'>
        <h2 className='font-medium leading-8'>Section templates</h2>
      </div>

      <div className='p-4 lg:px-5'>
        <nav className='-mt-2 mb-2 flex flex-col space-y-1'>
          {categories.map(({ title }, index) => (
            <button
              className='-mx-3 flex items-center justify-between rounded-sm px-3 text-start leading-10 hover:bg-secondary'
              // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
              key={index}
              type='button'
            >
              {title}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}

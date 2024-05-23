import type { JSX } from 'react'

import { structures, elements } from '@/data'

import DynamicIcon from './dynamic-icon'

export default function RawElements(): JSX.Element {
  return (
    <>
      <div className='p-4 lg:px-5'>
        <h2 className='font-medium leading-8'>Structures and elements</h2>
      </div>

      <div className='border-b p-4 lg:px-5'>
        <h3 className='mb-4 font-medium text-muted-foreground text-sm'>
          Structures
        </h3>

        <div className='mb-2 grid grid-cols-4 gap-x-2 gap-y-4 text-[11px]'>
          {structures.map(({ title, icon }, index) => (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
              key={index}
              type='button'
            >
              <div className='mb-2 flex aspect-square items-center justify-center rounded-sm bg-secondary'>
                <DynamicIcon className='size-7 stroke-[1.5]' icon={icon} />
              </div>

              <span>{title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className='p-4 lg:px-5'>
        <h3 className='mb-4 font-medium text-muted-foreground text-sm'>
          Elements
        </h3>

        <div className='grid grid-cols-4 gap-x-2 gap-y-4 text-[11px]'>
          {elements.map(({ title, icon }, index) => (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
              key={index}
              type='button'
            >
              <div className='mb-2 flex aspect-square items-center justify-center rounded-sm bg-secondary'>
                <DynamicIcon className='size-7 stroke-[1.5]' icon={icon} />
              </div>

              <span>{title}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

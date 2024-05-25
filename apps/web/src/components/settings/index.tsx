import { type JSX, useState } from 'react'

import { ChevronLeft, Lock } from '@acme/ui/components/icon'
import cn from '@acme/ui/utils/cn'

import type { Setting } from '@/types'
import { settings } from '@/data'

export default function Settings(): JSX.Element {
  const [children, setChildren] = useState<Setting['children']>()
  const [parentTitle, setParentTitle] = useState<string>('')
  const [list, setList] = useState<Setting[]>(settings)

  return (
    <>
      <div className='p-4'>
        <h2 className='font-medium leading-8'>Settings</h2>
      </div>

      <div className='p-4'>
        <nav className='-mt-2 mb-2 flex flex-col space-y-1'>
          {children ? (
            <button
              className='-mx-3 flex items-center space-x-2 px-3 text-start leading-10'
              onClick={() => {
                setParentTitle('')
                setChildren(undefined)
                setList(settings)
              }}
              type='button'
            >
              <ChevronLeft className='size-4 text-muted-foreground' />

              <span>{parentTitle}</span>
            </button>
          ) : null}

          {list.map(({ title, children, locked }, index) => (
            <button
              className={cn(
                '-mx-3 rounded-sm px-3 text-start leading-10',
                locked
                  ? 'flex items-center justify-between disabled:text-muted-foreground'
                  : 'hover:bg-secondary',
              )}
              // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
              key={index}
              type='button'
              {...(locked
                ? {
                    disabled: true,
                  }
                : {
                    onClick: () => {
                      setParentTitle(title)
                      setChildren(children)
                      setList([])
                    },
                  })}
            >
              <span>{title}</span>

              {locked ? (
                <Lock className='size-4 text-muted-foreground' />
              ) : null}
            </button>
          ))}
        </nav>

        {children}
      </div>
    </>
  )
}

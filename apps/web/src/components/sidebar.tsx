'use client'

import { type JSX, useEffect } from 'react'

import { X } from '@acme/ui/components/icon'

import useSidebar from '@/store/use-sidebar'
import { usePuck } from '@/lib/puck'

import PuckFields from './puck-fields'

export default function Sidebar(): JSX.Element | null {
  const {
    appState: { ui },
    selectedItem,
  } = usePuck()
  const { isOpen, close, component, setSidebar } = useSidebar()

  useEffect(() => {
    if (selectedItem) {
      setSidebar(<PuckFields />)
    }
  }, [ui])

  if (!isOpen) {
    return null
  }

  return (
    <div className='w-[340px] border-r'>
      <aside className='sticky top-0'>
        <button
          className='absolute top-6 right-6 text-muted-foreground hover:text-foreground'
          onClick={close}
          type='button'
        >
          <X className='size-5' />
        </button>

        {component}
      </aside>
    </div>
  )
}

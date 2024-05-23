'use client'

import type { JSX } from 'react'

import { X } from '@acme/ui/components/icon'

import useSidebar from '@/store/use-sidebar'

export default function Sidebar(): JSX.Element | null {
  const { isOpen, close, component } = useSidebar()

  if (!isOpen) {
    return null
  }

  return (
    <div className='w-80 border-r'>
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
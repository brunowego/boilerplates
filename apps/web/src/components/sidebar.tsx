'use client'

import cn from '@acme/ui/utils/cn'

import useSidePanel from '@/store/use-side-panel'

import { Dynamic } from './panels/dynamic'

// import { panel } from './panels'

export default function Sidebar() {
  const { isOpen, panel: name } = useSidePanel()

  return (
    <div className={cn('w-96 border-r', isOpen ? 'flex' : 'hidden')}>
      {/* {panel(name as string)} */}
      {name ? <Dynamic name={name} /> : null}
    </div>
  )
}

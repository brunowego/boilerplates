import type { JSX } from 'react'

import { LayoutContent } from '@/components/layout'

import Render from './components/render'

export default function RenderPage(): JSX.Element {
  return (
    <LayoutContent>
      <Render />
    </LayoutContent>
  )
}

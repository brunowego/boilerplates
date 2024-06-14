import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import DropdownMenu from './components/dropdown-menu'

export default function DropdownMenuPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Dropdown Menu</Page.Title>
      </Page.Header>

      <Page.Content className='space-y-4'>
        <DropdownMenu />
      </Page.Content>
    </Page>
  )
}

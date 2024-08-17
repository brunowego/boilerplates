import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import Popover from './components/popover'

export default function PopoverPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Popover</Page.Title>
      </Page.Header>

      <Page.Content>
        <Popover />
      </Page.Content>
    </Page>
  )
}

import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import Tooltip from './components/tooltip'

export default function TooltipPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Tooltip</Page.Title>
      </Page.Header>

      <Page.Content className='space-y-4'>
        <Tooltip />
      </Page.Content>
    </Page>
  )
}

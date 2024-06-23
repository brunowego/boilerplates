import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import Avatar from './components/avatar'

export default function AvatarPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Avatar</Page.Title>
      </Page.Header>

      <Page.Content className='space-y-4'>
        <Avatar />
      </Page.Content>
    </Page>
  )
}

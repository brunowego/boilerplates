import type { JSX } from 'react'

import Page from '@acme/ui/components/page'
import { typographyVariants } from '@acme/ui/components/typography'

import Avatar from './components/avatar'

export default function AvatarPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <h1
          className={typographyVariants({
            className: 'leading-8',
            variant: 'title',
          })}
        >
          Avatar
        </h1>
      </Page.Header>

      <Page.Content className='space-y-4'>
        <Avatar />
      </Page.Content>
    </Page>
  )
}

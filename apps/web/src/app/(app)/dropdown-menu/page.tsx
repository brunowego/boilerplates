import type { JSX } from 'react'

import Page from '@acme/ui/components/page'
import { typographyVariants } from '@acme/ui/components/typography'

import DropdownMenu from './components/dropdown-menu'

export default function DropdownMenuPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <h1
          className={typographyVariants({
            className: 'leading-8',
            variant: 'title',
          })}
        >
          Dropdown Menu
        </h1>
      </Page.Header>

      <Page.Content className='space-y-4'>
        <DropdownMenu />
      </Page.Content>
    </Page>
  )
}

import type { JSX } from 'react'

import Page from '@acme/ui/components/page'
import { typographyVariants } from '@acme/ui/components/typography'
import CopyButton from '@acme/ui/components/copy-button'

export default function ButtonPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <h1
          className={typographyVariants({
            className: 'leading-8',
            variant: 'title',
          })}
        >
          Copy Button
        </h1>
      </Page.Header>

      <Page.Content className='space-y-2'>
        <CopyButton
          className='rounded-full bg-secondary p-1.5 transition-colors *:size-4 active:scale-95 hover:scale-105 hover:bg-blue-100 *:hover:text-blue-800 *:transition-colors'
          value='127.0.0.1'
        />
      </Page.Content>
    </Page>
  )
}

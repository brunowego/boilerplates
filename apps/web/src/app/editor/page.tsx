import type { JSX } from 'react'

import Page from '@acme/ui/components/page'
import { typographyVariants } from '@acme/ui/components/typography'

import Editor from './component/editor'

export default function EditorPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <h1
          className={typographyVariants({
            className: 'leading-8',
            variant: 'title',
          })}
        >
          React Color
        </h1>
      </Page.Header>

      <Page.Content>
        <Editor />
      </Page.Content>
    </Page>
  )
}

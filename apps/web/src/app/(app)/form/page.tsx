import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import Form from './components/form'

export default function FormPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Form</Page.Title>
      </Page.Header>

      <Page.Content className='space-y-4'>
        <Form />
      </Page.Content>
    </Page>
  )
}

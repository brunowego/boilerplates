import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import PhoneInput from './components/form'

export default function ReactPhoneNumberInputPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>react-phone-number-input</Page.Title>
      </Page.Header>

      <Page.Content className='space-y-4'>
        <PhoneInput />
      </Page.Content>
    </Page>
  )
}

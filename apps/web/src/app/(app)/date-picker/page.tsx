import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import DatePicker from './components/date-picker'

export default function DatePickerPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Date Range Picker</Page.Title>
      </Page.Header>

      <Page.Content>
        <DatePicker className='w-64' />
      </Page.Content>
    </Page>
  )
}

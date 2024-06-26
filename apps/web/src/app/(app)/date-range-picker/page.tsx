import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import DateRangePicker from './components/date-range-picker'

export default function DateRangePickerPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Date Range Picker</Page.Title>
      </Page.Header>

      <Page.Content>
        <DateRangePicker className='w-80' />
      </Page.Content>
    </Page>
  )
}

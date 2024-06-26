import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import NotificationCenter from '@/components/notification-center'

export default function DatePickerPage(): JSX.Element {
  return (
    <Page>
      <Page.Header className='flex justify-between'>
        <Page.Title>Notifications</Page.Title>

        <NotificationCenter className='mt-3' />
      </Page.Header>

      <Page.Content />
    </Page>
  )
}

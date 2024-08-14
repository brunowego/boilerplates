import type { Metadata } from 'next'
import { type JSX, Suspense } from 'react'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'

import Page from '@acme/ui/components/page'

import ErrorFallback from '@/components/error-fallback'

import {
  NotificationSettings,
  NotificationSettingsSkeleton,
} from './components/notification-settings'

export const metadata: Metadata = {
  title: 'Notifications',
}

export default function NotificationsPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Notifications</Page.Title>
      </Page.Header>

      <Page.Content>
        <ErrorBoundary errorComponent={ErrorFallback}>
          <Suspense fallback={<NotificationSettingsSkeleton />}>
            <NotificationSettings />
          </Suspense>
        </ErrorBoundary>
      </Page.Content>
    </Page>
  )
}

import type { JSX } from 'react'

import Skeleton from '@acme/ui/components/skeleton'
import { getSubscriberPreferences } from '@acme/notification'

import { NotificationSetting } from './notification-setting'

export function NotificationSettingsSkeleton(): JSX.Element[] {
  return [...Array(2)].map((_, index) => (
    <Skeleton key={index.toString()} className='mb-3 h-4 w-[25%]' />
  ))
}

export async function NotificationSettings(): Promise<JSX.Element> {
  // const { data: userData } = await getUser()
  const userData = {
    id: '1',
    team_id: '1',
  }

  const { data: subscriberPreferences } = await getSubscriberPreferences({
    subscriberId: userData.id,
    teamId: userData.team_id,
  })

  const inAppSettings = subscriberPreferences
    // @ts-ignore
    ?.filter((setting) =>
      Object.keys(setting.preference.channels).includes('in_app'),
    )
    // @ts-ignore
    .map((setting) => {
      return (
        <NotificationSetting
          enabled={setting.preference.channels?.in_app}
          id={setting.template._id}
          key={setting.template._id}
          name={setting.template.name}
          subscriberId={userData.id}
          teamId={userData.team_id}
          type='in_app'
        />
      )
    })

  const emailSettings = subscriberPreferences
    // @ts-ignore
    ?.filter((setting) =>
      Object.keys(setting.preference.channels).includes('email'),
    )
    // @ts-ignore
    .map((setting) => {
      return (
        <NotificationSetting
          enabled={setting.preference.channels?.email}
          id={setting.template._id}
          key={setting.template._id}
          name={setting.template.name}
          subscriberId={userData.id}
          teamId={userData.team_id}
          type='email'
        />
      )
    })

  return (
    <div className='flex flex-col space-y-4'>
      <div>
        <h2 className='mb-2'>In-app notifications</h2>

        {inAppSettings}
      </div>

      <div>
        <h2 className='mb-2'>Email notifications</h2>

        {emailSettings}
      </div>
    </div>
  )
}

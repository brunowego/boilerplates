'use client'

import { useOptimisticAction } from 'next-safe-action/hooks'

import Label from '@acme/ui/components/label'
import Switch from '@acme/ui/components/switch'

import { updateSubscriberPreferenceAction } from '@/actions/update-subscriber-preference-action'

type Props = {
  id: string
  name: string
  enabled: boolean
  subscriberId: string
  teamId: string
  type: string
}

export function NotificationSetting({
  id,
  name,
  enabled,
  subscriberId,
  teamId,
  type,
}: Props) {
  const { execute, optimisticState } = useOptimisticAction(
    updateSubscriberPreferenceAction,
    {
      currentState: { enabled },
      updateFn: (state) => {
        return {
          ...state,
          enabled: !state.enabled,
        }
      },
    },
  )

  const onChange = () => {
    execute({
      templateId: id,
      type,
      revalidatePath: '/settings/notifications',
      subscriberId,
      teamId,
      enabled: !enabled,
    })
  }

  return (
    <div className='mb-4 flex flex-row items-center justify-between border-b-[1px] pb-4'>
      <div className='space-y-0.5'>
        <Label htmlFor={id}>{name}</Label>

        <p className='text-[#606060] text-sm'>
          Receive notifications about {name.toLowerCase()}.
        </p>
      </div>

      <Switch
        checked={optimisticState.enabled}
        id={id}
        onCheckedChange={onChange}
      />
    </div>
  )
}

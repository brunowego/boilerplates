'use server'

import { revalidatePath as revalidatePathFunc } from 'next/cache'

import { updateSubscriberPreference } from '@acme/notification'

import { updateSubscriberPreferenceSchema } from '@/schemas'

import { authActionClient } from '@/lib/safe-action'

export const updateSubscriberPreferenceAction = authActionClient
  .schema(updateSubscriberPreferenceSchema)
  .metadata({
    name: 'update-subscriber-preference',
  })
  .action(async ({ parsedInput: { revalidatePath, ...data } }) => {
    const preference = await updateSubscriberPreference(data)

    revalidatePathFunc(revalidatePath)

    return preference
  })

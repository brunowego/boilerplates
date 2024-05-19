'use client'

import type { JSX } from 'react'

import { useProfile } from '@/hooks/api/use-profile'

import UpdateProfileForm from './update-profile-form'

type UpdateProfile = {
  className?: string
}

export default function UpdateProfile({
  className,
}: UpdateProfile): JSX.Element {
  const { data: profile, isLoading } = useProfile()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <UpdateProfileForm className={className} profile={profile} />
}

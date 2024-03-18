'use client'

import { useGetProfile } from '@/hooks/api/use-profile'

import PersonalDataForm from './profile-form'

export default function Form(): JSX.Element {
  const { data: user, isLoading } = useGetProfile()

  return <>{isLoading ? null : <PersonalDataForm user={user} />}</>
}

'use client'

import type { JSX } from 'react'
import { useSearchParams } from 'next/navigation'

import Select from '@acme/ui/components/select'
import { USER_ROLES } from '@acme/db/constants'

export default function RoleSelector(): JSX.Element {
  const searchParams = useSearchParams()
  const role = searchParams.get('role') || 'member'

  return (
    <Select value={role}>
      <Select.Trigger className='max-w-56' value={role}>
        <Select.Value aria-label={role} asChild>
          <p className='mr-2 w-full truncate text-start'>{role}</p>
        </Select.Value>
      </Select.Trigger>

      <Select.Content className='max-w-64'>
        <Select.Group>
          <Select.Label>Roles</Select.Label>

          {USER_ROLES.map((role) => {
            return (
              <Select.Item key={role} value={role}>
                {role}
              </Select.Item>
            )
          })}
        </Select.Group>
      </Select.Content>
    </Select>
  )
}

'use client'

import { useSearchParams } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@acme/ui/components/select'
import { USER_ROLES } from '@acme/db/constants'

export default function RoleSelector() {
  const searchParams = useSearchParams()
  const role = searchParams.get('role') || 'member'

  return (
    <Select value={role}>
      <SelectTrigger className='max-w-56' value={role}>
        <SelectValue aria-label={role} asChild>
          <p className='mr-2 w-full truncate text-start'>{role}</p>
        </SelectValue>
      </SelectTrigger>

      <SelectContent className='max-w-64'>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>

          {USER_ROLES.map((role) => {
            return (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

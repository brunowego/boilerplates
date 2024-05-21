'use client'

import { type JSX, useState } from 'react'
import { addDays, format } from 'date-fns'

import type { DateRange } from '@acme/ui/lib/react-day-picker'
import { typographyVariants } from '@acme/ui/components/typography'
import Button from '@acme/ui/components/button'
import { Calendar as CalendarIcon } from '@acme/ui/components/icon'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@acme/ui/components/popover'
import Calendar from '@acme/ui/components/calendar'
import cn from '@acme/ui/lib/cn'
import FacetedFilter from '@acme/ui/components/faceted-filter'

import { Page, PageHeader } from '@/components/page'
import RoleSelector from '@/components/role-selector'

import UsersList from './components/users-list'

import {
  CheckCircledIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons'

const statuses = [
  {
    value: 'broken',
    label: 'Danificado',
    icon: ExclamationTriangleIcon,
  },
  {
    value: 'available',
    label: 'Disponível',
    icon: CheckCircledIcon,
  },
  {
    value: 'in use',
    label: 'Em uso',
    icon: CrossCircledIcon,
  },
]

export default function HomePage(): JSX.Element {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  return (
    <Page>
      <PageHeader>
        <h1 className={typographyVariants({ variant: 'title' })}>Users</h1>
      </PageHeader>

      <div className='flex-1 p-4 px-5'>
        <div className='flex space-x-2'>
          <RoleSelector />

          {/* <FacetedFilter
            // column={}
            title='Status'
            options={statuses}
          /> */}

          {/* <Popover>
            <PopoverTrigger asChild>
              <Button
                className={cn(
                  'justify-start border-dashed text-left font-normal',
                  !date && 'text-muted-foreground',
                )}
                id='date'
                variant='outline'
              >
                <CalendarIcon className='mr-2 size-4' />

                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                initialFocus
                mode='range'
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover> */}

          <Button variant='ghost'>Clean</Button>
        </div>

        <UsersList className='mt-4' />
      </div>
    </Page>
  )
}

'use client'

import { type HTMLAttributes, useState } from 'react'

import type { DateRange } from '@acme/ui/lib/react-day-picker'
import { addDays, format } from '@acme/ui/lib/date-fns'
import cn from '@acme/ui/utils/cn'
import Popover from '@acme/ui/components/popover'
import Button from '@acme/ui/components/button'
import { Calendar as CalendarIcon } from '@acme/ui/components/icon'
import Calendar from '@acme/ui/components/calendar'

export default function DateRangePicker({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button
          className={cn(
            '!justify-start',
            !date && 'text-muted-foreground',
            className,
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
      </Popover.Trigger>

      <Popover.Content align='start' className='w-auto p-0'>
        <Calendar
          defaultMonth={date?.from}
          initialFocus
          mode='range'
          numberOfMonths={2}
          onSelect={setDate}
          selected={date}
        />
      </Popover.Content>
    </Popover>
  )
}

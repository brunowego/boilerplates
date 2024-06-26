'use client'

import { useState } from 'react'

import Popover from '@acme/ui/components/popover'
import Button from '@acme/ui/components/button'
import cn from '@acme/ui/utils/cn'
import { Calendar as CalendarIcon } from '@acme/ui/components/icon'
import { format } from '@acme/ui/lib/date-fns'
import Calendar from '@acme/ui/components/calendar'

type DatePickerProps = {
  className?: string
}

export default function DatePicker({ className }: DatePickerProps) {
  const [date, setDate] = useState<Date>()

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button
          className={cn(
            '!justify-start',
            !date && 'text-muted-foreground',
            className,
          )}
          variant='outline'
        >
          <CalendarIcon className='mr-2 size-4' />

          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </Popover.Trigger>

      <Popover.Content align='start' className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </Popover.Content>
    </Popover>
  )
}

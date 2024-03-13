'use client'

import { Button, toast, CalendarDateRangePicker } from '@acme/ui'

import { useGetProfile } from '@/hooks/api/use-profile'

export const Header = () => {
  const { data } = useGetProfile()

  return (
    <div className='flex justify-between items-center space-y-2'>
      <h2 className='text-3xl font-bold tracking-tight'>
        {/* Hi {data?.user?.first_name ?? 'there'}! */}
        Hi there!
      </h2>

      <div className='flex items-center space-x-2'>
        <CalendarDateRangePicker />

        <Button
          onClick={() => {
            toast('Processing the file for download...')
          }}
        >
          Download
        </Button>
      </div>
    </div>
  )
}

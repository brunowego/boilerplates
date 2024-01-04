import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const ordersFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof ordersFiltersSchema>

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, reset, control } =
    useForm<OrderFiltersSchema>({
      defaultValues: {
        orderId: orderId ?? '',
        customerName: customerName ?? '',
        status: status ?? 'all',
      },
    })

  function handleFilter(data: OrderFiltersSchema) {
    const orderId = data.orderId?.toString()
    const customerName = data.customerName?.toString()
    const status = data.status?.toString()

    setSearchParams((prev) => {
      if (orderId) {
        prev.set('orderId', orderId)
      } else {
        prev.delete('orderId')
      }

      if (customerName) {
        prev.set('customerName', customerName)
      } else {
        prev.delete('customerName')
      }

      if (status) {
        prev.set('status', status)
      } else {
        prev.delete('status')
      }

      prev.set('page', '1')

      return prev
    })
  }

  function handleClearFilters() {
    setSearchParams((prev) => {
      prev.delete('orderId')
      prev.delete('customerName')
      prev.delete('status')
      prev.set('page', '1')

      return prev
    })

    reset({
      orderId: '',
      customerName: '',
      status: 'all',
    })
  }

  const hasAnyFilter = !!orderId || !!customerName || !!status

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className='flex items-center gap-2'
    >
      <span className='text-sm font-semibold'>Filters:</span>

      <Input
        placeholder='Order ID'
        className='h-8 w-auto'
        {...register('orderId')}
      />

      <Input
        placeholder='Client name'
        className='h-8 w-[320px]'
        {...register('customerName')}
      />

      <Controller
        control={control}
        name='status'
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className='h-8 w-[180px]'>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value='all'>All statuses</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='canceled'>Canceled</SelectItem>
                <SelectItem value='processing'>In preparation</SelectItem>
                <SelectItem value='delivering'>In delivery</SelectItem>
                <SelectItem value='delivered'>Delivered</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      <Button type='submit' variant='secondary' size='xs'>
        <Search className='mr-2 h-4 w-4' />
        Filter results
      </Button>

      <Button
        type='button'
        variant='outline'
        size='xs'
        disabled={!hasAnyFilter}
        onClick={handleClearFilters}
      >
        <X className='mr-2 h-4 w-4' />
        Remove filters
      </Button>
    </form>
  )
}

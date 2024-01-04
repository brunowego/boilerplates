import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { enUS as locale } from 'date-fns/locale'
import { Loader2 } from 'lucide-react'

import { getOrderDetails } from '@/api/get-order-details'
import { OrderStatus } from '@/components/order-status'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderDetailsSkeleton } from './order-details-skeleton'

interface OrderDetailsProps {
  orderId: string
  open: boolean
}

export function OrderDetails({ orderId, open }: OrderDetailsProps) {
  const {
    data: order,
    isLoading: isLoadingOrder,
    isFetching: isFetchingOrder,
  } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetails({ orderId }),
    staleTime: 1000 * 60 * 15, // 15 minutes
    enabled: open,
  })

  return (
    <DialogContent className='sm:max-w-[520px]'>
      <DialogHeader>
        <DialogTitle className='flex items-center gap-2'>
          Order: {orderId}
          {isFetchingOrder && (
            <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
          )}
        </DialogTitle>

        <DialogDescription>Order details</DialogDescription>
      </DialogHeader>

      {isLoadingOrder && <OrderDetailsSkeleton />}

      {order && (
        <div className='space-y-6'>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className='text-muted-foreground'>Status</TableCell>
                <TableCell className='flex justify-end'>
                  <OrderStatus status={order.status} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className='text-muted-foreground'>Client</TableCell>
                <TableCell className='text-right'>
                  {order.customer.name}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className='text-muted-foreground'>
                  Cell phone
                </TableCell>
                <TableCell className='text-right'>
                  {order.customer.phone ?? (
                    <span className='italic text-muted-foreground'>
                      Uninformed
                    </span>
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className='text-muted-foreground'>E-mail</TableCell>
                <TableCell className='text-right'>
                  {order.customer.email}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className='text-muted-foreground'>
                  Created ago
                </TableCell>
                <TableCell className='text-right'>
                  {formatDistanceToNow(new Date(order.createdAt), {
                    locale,
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className='text-right'>Qty.</TableHead>
                <TableHead className='text-right'>Price</TableHead>
                <TableHead className='text-right'>Subtotal</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {order.orderItems.map((orderItem) => {
                return (
                  <TableRow key={orderItem.id}>
                    <TableCell>{orderItem.product.name}</TableCell>

                    <TableCell className='text-right'>
                      {orderItem.quantity}
                    </TableCell>

                    <TableCell className='text-right'>
                      {(orderItem.priceInCents / 100).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </TableCell>

                    <TableCell className='text-right'>
                      {(
                        (orderItem.priceInCents * orderItem.quantity) /
                        100
                      ).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total order</TableCell>

                <TableCell className='text-right font-medium'>
                  {(order.totalInCents / 100).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </DialogContent>
  )
}

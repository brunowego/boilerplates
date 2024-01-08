'use client'

import type { JSX } from 'react'

import { Button } from '@acme/ui/src/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@acme/ui/src/components/ui/card'
import { CalendarDateRangePicker } from '@acme/ui/src/components/ui/date-range-picker'
import { Overview } from '@acme/ui/src/components/ui/overview'
import { RecentSales } from '@acme/ui/src/components/ui/recent-sales'
import { Search } from '@acme/ui/src/components/ui/search'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@acme/ui/src/components/ui/tabs'
import TeamSwitcher from '@acme/ui/src/components/ui/team-switcher'
import { UserNav } from '@acme/ui/src/components/ui/user-nav'

import { MainNav } from '@/components/main-nav'
import { Subscriptions } from '@/components/subscriptions'
import { TotalRevenue } from '@/components/total-revenue'
import { useTotalRevenue, useSubscriptions } from '@/hooks/useMetrics'

export default function Page(): JSX.Element {
  return (
    <div className='hidden flex-col md:flex'>
      <div className='border-b'>
        <div className='flex h-16 items-center px-4'>
          <TeamSwitcher />

          <MainNav className='mx-6' />

          <div className='ml-auto flex items-center space-x-4'>
            <Search />

            <UserNav />
          </div>
        </div>
      </div>

      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>

          <div className='flex items-center space-x-2'>
            <CalendarDateRangePicker />

            <Button>Download</Button>
          </div>
        </div>

        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>

            <TabsTrigger value='analytics' disabled>
              Analytics
            </TabsTrigger>

            <TabsTrigger value='reports' disabled>
              Reports
            </TabsTrigger>

            <TabsTrigger value='notifications' disabled>
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <TotalRevenue query={useTotalRevenue} />
              <Subscriptions query={useSubscriptions} />

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Sales</CardTitle>

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <rect width='20' height='14' x='2' y='5' rx='2' />
                    <path d='M2 10h20' />
                  </svg>
                </CardHeader>

                <CardContent>
                  <div className='text-2xl font-bold'>+12,234</div>

                  <p className='text-xs text-muted-foreground'>
                    +19% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Active Now
                  </CardTitle>

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>

                <CardContent>
                  <div className='text-2xl font-bold'>+573</div>

                  <p className='text-xs text-muted-foreground'>
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
              <Card className='col-span-4'>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>

                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>

              <Card className='col-span-3'>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>

                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'

import cn from '../utils/cn'

const TabsRoot = TabsPrimitive.Root

const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    className={cn(
      'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
      className,
    )}
    ref={ref}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 font-medium text-sm ring-offset-background transition-all disabled:pointer-events-none data-[state=active]:bg-background data-[state=active]:text-foreground disabled:opacity-50 data-[state=active]:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    ref={ref}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    ref={ref}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

type TabsProps = typeof TabsRoot & {
  List: typeof TabsList
  Trigger: typeof TabsTrigger
  Content: typeof TabsContent
}

const Tabs = TabsRoot as TabsProps

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export default Tabs

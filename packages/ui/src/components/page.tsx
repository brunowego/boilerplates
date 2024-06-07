import type { HTMLAttributes } from 'react'

import cn from '@acme/ui/utils/cn'

type PageProps = HTMLAttributes<HTMLElement>

const Page = ({ className, ...props }: PageProps) => {
  return (
    <article
      className={cn('flex h-full flex-1 flex-col', className)}
      {...props}
    />
  )
}

type PageHeaderProps = HTMLAttributes<HTMLElement>

const PageHeader = ({ className, ...props }: PageHeaderProps) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-10 flex h-16 shrink-0 items-center space-x-4 border-b bg-background px-4 lg:px-5',
        className,
      )}
      {...props}
    />
  )
}

type PageContentProps = HTMLAttributes<HTMLElement>

const PageContent = ({ className, ...props }: PageContentProps) => {
  return <section className={cn('flex-1 p-4 lg:px-5', className)} {...props} />
}

type PageFooterProps = HTMLAttributes<HTMLElement>

const PageFooter = ({ className, ...props }: PageFooterProps) => {
  return (
    <footer
      className={cn('shrink-0 border-t p-4 lg:px-5', className)}
      {...props}
    />
  )
}

Page.Header = PageHeader
Page.Content = PageContent
Page.Footer = PageFooter

export default Page

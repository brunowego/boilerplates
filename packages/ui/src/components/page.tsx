import type { HTMLAttributes } from 'react'

import cn from '../utils/cn'
import { typographyVariants } from './typography'

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
        'sticky top-0 z-10 min-h-16 shrink-0 border-b bg-background px-4 lg:px-5',
        className,
      )}
      {...props}
    />
  )
}

type PageTitleProps = {
  className?: string
  children: string
}

const PageTitle = ({ className, ...props }: PageTitleProps) => {
  return (
    <h1
      className={typographyVariants({
        className: 'mt-4',
        variant: 'title',
      })}
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
Page.Title = PageTitle
Page.Content = PageContent
Page.Footer = PageFooter

export default Page

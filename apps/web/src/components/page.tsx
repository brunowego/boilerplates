import cn from '@acme/ui/utils/cn'
import type { HTMLAttributes, ReactNode } from 'react'

type PageProps = HTMLAttributes<HTMLElement>

const Page = ({ className, ...props }: PageProps) => {
  return (
    <article
      className={cn('flex h-full shrink-0 flex-col', className)}
      {...props}
    />
  )
}

type PageHeaderProps = HTMLAttributes<HTMLElement>

const PageHeader = ({ className, ...props }: PageHeaderProps) => {
  return <header className={cn('border-b p-4 lg:px-5', className)} {...props} />
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

export { Page, PageHeader, PageContent, PageFooter }

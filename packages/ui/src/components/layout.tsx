import type { HTMLAttributes } from 'react'

import cn from '@acme/ui/utils/cn'

type LayoutProps = HTMLAttributes<HTMLDivElement>

const Layout = ({ className, ...props }: LayoutProps) => {
  return <div className={cn('min-h-screen', className)} {...props} />
}

type LayoutHeaderProps = HTMLAttributes<HTMLElement>

const LayoutHeader = ({ className, ...props }: LayoutHeaderProps) => {
  return (
    <header className={cn('mt-4 px-4 xl:container', className)} {...props} />
  )
}

type LayoutContentProps = HTMLAttributes<HTMLElement>

const LayoutContent = ({ className, ...props }: LayoutContentProps) => {
  return <main className={cn('container h-full', className)} {...props} />
}

type LayoutFooterProps = HTMLAttributes<HTMLElement>

const LayoutFooter = ({ className, ...props }: LayoutFooterProps) => {
  return <aside className={cn('container', className)} {...props} />
}

Layout.Header = LayoutHeader
Layout.Content = LayoutContent
Layout.Footer = LayoutFooter

export default Layout

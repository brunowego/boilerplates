import type { HTMLAttributes } from 'react'

import cn from '@acme/ui/lib/cn'

type LayoutProps = HTMLAttributes<HTMLDivElement>

const Layout = ({ className, ...props }: LayoutProps) => {
  return (
    <div
      className={cn('flex min-h-screen 2xl:container', className)}
      {...props}
    />
  )
}

type LayoutHeaderProps = HTMLAttributes<HTMLElement> & {
  infinite?: boolean
}

const LayoutHeader = ({
  infinite = true,
  className,
  ...props
}: LayoutHeaderProps) => {
  return (
    <>
      {infinite ? (
        <div className='-translate-x-full fixed top-0 bottom-0 z-50 w-full bg-secondary' />
      ) : null}

      <header
        className={cn(
          'fixed inset-y-0 z-40 flex w-16 flex-col gap-y-4 px-2 py-4 text-center shadow-md',
          infinite ? 'bg-secondary' : null,
          className,
        )}
        {...props}
      />
    </>
  )
}

type LayoutContentProps = HTMLAttributes<HTMLElement>

const LayoutContent = ({ className, ...props }: LayoutContentProps) => {
  return <main className={cn('w-full border-r pl-16', className)} {...props} />
}

type LayoutAsideProps = HTMLAttributes<HTMLElement>

const LayoutAside = ({ className, ...props }: LayoutAsideProps) => {
  return (
    <aside
      className={cn('w-96 shrink-0 border-l max-lg:hidden', className)}
      {...props}
    />
  )
}

export { Layout, LayoutHeader, LayoutContent, LayoutAside }

import cn from '@acme/ui/utils/cn'
import type { HTMLAttributes } from 'react'

type LayoutProps = HTMLAttributes<HTMLDivElement>

const Layout = ({ className, ...props }: LayoutProps) => {
  return (
    <div className={cn('flex h-screen 2xl:container', className)} {...props} />
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
        <div className='-translate-x-full fixed top-0 bottom-0 w-full bg-secondary' />
      ) : null}

      <header
        className={cn(
          'fixed inset-y-0 flex w-16 flex-col gap-y-2 px-2 py-4 text-center',
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
  return <main className={cn('w-full pl-16', className)} {...props} />
}

type LayoutAsideProps = HTMLAttributes<HTMLElement>

const LayoutAside = ({ className, ...props }: LayoutAsideProps) => {
  return (
    <aside className={cn('w-96 shrink-0 border-l', className)} {...props} />
  )
}

export { Layout, LayoutHeader, LayoutContent, LayoutAside }

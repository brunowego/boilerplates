import type { HTMLAttributes } from 'react'
import Link from 'next/link'

import cn from '@acme/ui/utils/cn'
import { LogoMark } from '@acme/ui/components/logo'

import ThemeToggle from './theme-toggle'

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
  children,
}: LayoutHeaderProps) => {
  return (
    <>
      {infinite ? (
        <div className='-translate-x-full fixed top-0 bottom-0 z-10 w-full bg-secondary' />
      ) : null}

      <header
        className={cn(
          'fixed inset-y-0 flex w-16 flex-col gap-y-2 px-2 py-3 text-center shadow-md',
          infinite ? 'bg-secondary' : null,
          className,
        )}
      >
        <Link className='self-center py-1' href='/'>
          <LogoMark className='size-8' />
        </Link>

        <div className='flex h-full flex-col items-center gap-y-2 *:p-2.5'>
          {children}
        </div>

        <ThemeToggle className='self-center' />
      </header>
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

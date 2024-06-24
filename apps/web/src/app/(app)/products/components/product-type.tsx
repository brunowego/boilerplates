import type { JSX, ElementType } from 'react'
import Link from 'next/link'

import Page from '@acme/ui/components/page'
import { LogOut } from '@acme/ui/components/icon'
import { buttonVariants } from '@acme/ui/components/button'
import Service from '@acme/ui/components/service'

const types = [
  {
    id: 1,
    title: 'Serviços',
    icon: 'Service',
  },
  {
    id: 2,
    title: 'Infoprodutos',
    icon: 'Study',
  },
  {
    id: 3,
    title: 'Produtos',
    icon: 'Product',
  },
] as {
  id: number
  title: string
  icon: keyof typeof Service
}[]

export default function ProductType(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Link
          className={buttonVariants({
            className: 'absolute mt-3',
            size: 'icon',
            variant: 'secondary',
          })}
          href='/'
        >
          <LogOut className='size-4 scale-x-[-1]' />

          <span className='sr-only'>Voltar</span>
        </Link>
      </Page.Header>

      <Page.Content className='relative'>
        <div className='mx-auto max-w-xl space-y-6'>
          <h1 className='my-10 text-2xl leading-normal'>
            Olá 👋! O que você vai anunciar?
          </h1>
        </div>

        <div className='-z-10 absolute top-0 right-0 h-[224px] w-full bg-white dark:bg-[#0f0f0f]' />

        <div className='mx-auto max-w-xl space-y-6'>
          <nav className='grid grid-cols-3 gap-x-4'>
            {types.map(({ id, title, icon }) => {
              const Ikon = Service[icon] as ElementType

              return (
                <Link
                  className='flex flex-col items-center gap-y-2 rounded-md border bg-secondary p-5 text-sm shadow-sm'
                  href='/'
                  key={id}
                >
                  <Ikon className='inline-block size-24' />

                  <span className='font-medium'>{title}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </Page.Content>
    </Page>
  )
}

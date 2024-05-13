import type { JSX } from 'react'
import Link from 'next/link'

import { Info } from '@acme/ui/components/icon'

type TldrProps = {
  message: string
  cta: {
    label: string
    href: string
  }
}

export default function Tldr({ message, cta }: TldrProps): JSX.Element {
  return (
    <div className='mt-3 rounded-md bg-teal-50 p-4 text-left'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <Info className='size-5 text-teal-600' aria-hidden='true' />
        </div>

        <div className='ml-3'>
          <div className='text-sm text-teal-600'>
            <p>{message}</p>
          </div>

          <div className='mt-4'>
            <div className='-mx-2 -my-1.5 flex'>
              <Link
                className='rounded bg-teal-100 px-2 py-1.5 font-medium text-teal-700 text-xs hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-teal-50'
                href={cta.href}
                passHref
                rel='noopener noreferrer'
                target='_blank'
              >
                <span className='mr-1'>{cta.label}</span>

                <span aria-hidden='true'> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import type { JSX } from 'react'
import { Puck, type Data } from '@measured/puck'
import '@measured/puck/puck.css'

import Separator from '@acme/ui/components/separator'

import { LayoutContent, LayoutAside } from '@/components/layout'
import { config, data } from '@/lib/puck'
import overrides from '@/lib/puck/overrides'

export default function Edit(): JSX.Element {
  const save = (data: Data) => {
    alert(JSON.stringify(data))
  }

  return (
    <Puck config={config} data={data} onPublish={save} overrides={overrides}>
      <LayoutContent>
        <Puck.Preview />
      </LayoutContent>

      <LayoutAside>
        <div className='p-4'>
          <h3 className='font-medium text-sm leading-6'>Components</h3>

          <div className='mt-4' />

          <Puck.Components />
        </div>

        <Separator />

        <div className='p-4'>
          <h3 className='font-medium text-sm leading-6'>Outline</h3>

          <div className='mt-4' />

          <Puck.Outline />
        </div>

        <Separator />

        <Puck.Fields />
      </LayoutAside>
    </Puck>
  )
}

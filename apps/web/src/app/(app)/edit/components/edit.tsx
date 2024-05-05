'use client'

import type { JSX } from 'react'
import { Puck, type Data } from '@measured/puck'
import '@measured/puck/puck.css'

import { config, data } from '@/lib/puck'

export default function Edit(): JSX.Element {
  const save = (data: Data) => {
    alert(JSON.stringify(data))
  }

  return <Puck config={config} data={data} onPublish={save} />
}

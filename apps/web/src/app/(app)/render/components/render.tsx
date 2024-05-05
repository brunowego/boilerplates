'use client'

import type { JSX } from 'react'
import { Render as PuckRender } from '@measured/puck'

import { config, data } from '@/lib/puck'

export default function Render(): JSX.Element {
  return <PuckRender config={config} data={data} />
}

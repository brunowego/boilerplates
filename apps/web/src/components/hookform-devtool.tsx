'use client'

import dynamic from 'next/dynamic'
import type { DevtoolUIProps } from '@hookform/devtools/dist/devToolUI'
import type { JSX } from 'react'

import useHookFormDevtool from '@/store/use-hook-form-devtool'

const DevTool = dynamic<DevtoolUIProps>(
  () => import('@hookform/devtools').then((mod) => mod.DevTool),
  {
    ssr: false,
  },
)

type HookFormDevtoolProps = {
  env: string
}

export default function HookFormDevtool({
  env,
}: HookFormDevtoolProps): JSX.Element | null {
  if (env === 'production') {
    return null
  }

  const { control } = useHookFormDevtool()

  if (!control) {
    return null
  }

  return <DevTool control={control} styles={{ button: { zIndex: 100 } }} />
}

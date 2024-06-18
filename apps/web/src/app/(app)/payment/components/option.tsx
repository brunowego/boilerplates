import { type ReactNode, type JSX, useState } from 'react'
import { motion } from 'framer-motion'

import type { PaymentMethod } from '@acme/db/types'
import Label from '@acme/ui/components/label'
import Switch from '@acme/ui/components/switch'

import { FADE_IN_ANIMATION_SETTINGS } from '@/constants/framer-motion'

type OptionProps = Pick<PaymentMethod, 'enabled' | 'type'> & {
  icon: ReactNode
  title: string
  children?: ReactNode
}

export default function Option({
  enabled = false,
  type,
  icon,
  title,
  children,
}: OptionProps): JSX.Element | null {
  const [expanded, setExpanded] = useState(enabled)

  return (
    <>
      <div className='flex items-center space-x-4'>
        <Label className='grow space-x-1.5 font-medium' htmlFor={type}>
          {icon}

          <span className='font-medium text-base'>{title}</span>
        </Label>

        <Switch
          checked={expanded as boolean}
          id={type}
          onClick={() => setExpanded(!expanded)}
        />
      </div>

      {children && expanded ? (
        <motion.div className='space-y-4' {...FADE_IN_ANIMATION_SETTINGS}>
          {children}
        </motion.div>
      ) : null}
    </>
  )
}

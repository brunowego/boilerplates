import { type ReactNode, type JSX, useState } from 'react'
import { motion } from 'framer-motion'

import Label from '@acme/ui/components/label'
import Switch from '@acme/ui/components/switch'

import { FADE_IN_ANIMATION_SETTINGS } from '@/constants/framer-motion'

type OptionProps = {
  enabled: boolean | null
  title: string
  icon: ReactNode
  children?: ReactNode
}

export default function Option({
  enabled = false,
  icon,
  title,
  children,
}: OptionProps): JSX.Element | null {
  const [expanded, setExpanded] = useState(enabled)

  return (
    <>
      <div className='flex items-center space-x-4'>
        <Label className='grow space-x-1.5 font-medium' htmlFor='paypal'>
          {icon}

          <span className='font-medium text-base'>{title}</span>
        </Label>

        <Switch
          checked={expanded as boolean}
          id='paypal'
          onClick={() => setExpanded(!expanded)}
        />
      </div>

      {expanded ? (
        <motion.div className='space-y-4' {...FADE_IN_ANIMATION_SETTINGS}>
          {children}
        </motion.div>
      ) : null}
    </>
  )
}

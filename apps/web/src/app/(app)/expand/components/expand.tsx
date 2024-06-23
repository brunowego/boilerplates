'use client'

import { type JSX, useState } from 'react'
import { motion } from 'framer-motion'

import { ChevronRight } from '@acme/ui/components/icon'
import cn from '@acme/ui/utils/cn'

import { FADE_IN_ANIMATION_SETTINGS } from '@/constants/framer-motion'

export default function Form(): JSX.Element {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <button
        className='flex items-center space-x-2'
        onClick={() => setExpanded(!expanded)}
        type='button'
      >
        <ChevronRight
          className={cn(
            'size-4 transition-transform',
            expanded ? 'rotate-90' : null,
          )}
        />

        <span className='text-sm'>Advanced options</span>
      </button>

      {expanded ? (
        <motion.div {...FADE_IN_ANIMATION_SETTINGS}>TBD</motion.div>
      ) : null}
    </>
  )
}

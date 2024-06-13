import { type JSX, useState } from 'react'
import { useMeasure } from 'react-use'
import { motion } from 'framer-motion'

import Label from '@acme/ui/components/label'
import Switch from '@acme/ui/components/switch'
import Input from '@acme/ui/components/input'
import { Truck } from '@acme/ui/components/icon'

import { FADE_IN_ANIMATION_SETTINGS } from '@/constants/framer-motion'

export default function Delivery(): JSX.Element {
  const [expanded, setExpanded] = useState(false)

  const [spanRef, { width }] = useMeasure<HTMLSpanElement>()

  return (
    <>
      <div className='flex items-center space-x-4'>
        <Label className='grow space-x-1.5 font-medium' htmlFor='delivery'>
          <div className='p-1'>
            <Truck className='size-6' />
          </div>

          <span className='font-medium text-base'>Delivery</span>
        </Label>

        <Switch id='delivery' onClick={() => setExpanded(!expanded)} />
      </div>

      {expanded ? (
        <motion.div className='space-y-4' {...FADE_IN_ANIMATION_SETTINGS}>
          <div className='space-y-2'>
            <Label>Delivery fee</Label>

            <div className='relative'>
              <span
                className='absolute inset-y-0 left-4 flex items-center text-muted-foreground text-sm'
                ref={spanRef}
              >
                R$
              </span>

              <Input
                defaultValue={0}
                style={{ paddingLeft: width + 20 }}
                type='text'
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </>
  )
}

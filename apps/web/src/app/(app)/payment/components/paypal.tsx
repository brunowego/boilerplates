import { type JSX, useState } from 'react'
import { useMeasure } from 'react-use'
import { motion } from 'framer-motion'
import Link from 'next/link'

import Label from '@acme/ui/components/label'
import Switch from '@acme/ui/components/switch'
import Input from '@acme/ui/components/input'
import { PayPal as PayPalIcon } from '@acme/ui/components/logo'

import { FADE_IN_ANIMATION_SETTINGS } from '@/constants/framer-motion'

export default function PayPal(): JSX.Element {
  const [expanded, setExpanded] = useState(false)

  const [spanRef, { width }] = useMeasure<HTMLSpanElement>()

  return (
    <>
      <div className='flex items-center space-x-4'>
        <Label className='grow space-x-1.5 font-medium' htmlFor='paypal'>
          <PayPalIcon className='size-8' />

          <span className='font-medium text-base'>PayPal</span>
        </Label>

        <Switch id='paypal' onClick={() => setExpanded(!expanded)} />
      </div>

      {expanded ? (
        <motion.div className='space-y-4' {...FADE_IN_ANIMATION_SETTINGS}>
          <div className='space-y-2'>
            <Label>Username</Label>

            <div className='relative'>
              <span
                className='absolute inset-y-0 left-4 flex items-center text-muted-foreground text-sm'
                ref={spanRef}
              >
                https://paypal.me/
              </span>

              <Input style={{ paddingLeft: width + 16 }} type='text' />
            </div>

            <p className='text-muted-foreground text-sm leading-6'>
              Don't have PayPal account?{' '}
              <Link
                className='text-foreground underline underline-offset-4'
                href='/'
              >
                Sign up
              </Link>
              .
            </p>
          </div>
        </motion.div>
      ) : null}
    </>
  )
}

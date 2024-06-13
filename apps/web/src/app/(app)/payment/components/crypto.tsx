import { type JSX, useState } from 'react'
import { motion } from 'framer-motion'

import Label from '@acme/ui/components/label'
import Switch from '@acme/ui/components/switch'
import Select from '@acme/ui/components/select'
import Input from '@acme/ui/components/input'
import { Bitcoin } from '@acme/ui/components/icon'

import { FADE_IN_ANIMATION_SETTINGS } from '@/constants/framer-motion'

export default function Crypto(): JSX.Element {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <div className='flex items-center space-x-4'>
        <Label className='grow space-x-1.5 font-medium' htmlFor='crypto'>
          <Bitcoin className='size-8' />

          <span className='font-medium text-base'>Crypto</span>
        </Label>

        <Switch id='crypto' onClick={() => setExpanded(!expanded)} />
      </div>

      {expanded ? (
        <motion.div className='space-y-4' {...FADE_IN_ANIMATION_SETTINGS}>
          <div className='grid grid-cols-3 space-x-3'>
            <div className='space-y-2'>
              <Label>
                Coin{' '}
                <span className='text-[10px] text-muted-foreground'>/</span>{' '}
                Token
              </Label>

              <Select
                defaultValue='btc'
                // onValueChange={}
              >
                <Select.Trigger>
                  <Select.Value />
                </Select.Trigger>

                <Select.Content>
                  <Select.Item value='btc'>Bitcoin</Select.Item>
                  <Select.Item value='eth'>Ethereum</Select.Item>
                </Select.Content>
              </Select>
            </div>

            <div className='col-span-2 space-y-2'>
              <Label>Wallet address</Label>

              <Input type='text' />
            </div>
          </div>
        </motion.div>
      ) : null}
    </>
  )
}

import { type JSX, useState } from 'react'
import { motion } from 'framer-motion'

import Label from '@acme/ui/components/label'
import Switch from '@acme/ui/components/switch'
import Input from '@acme/ui/components/input'
import Select from '@acme/ui/components/select'
import { Landmark } from '@acme/ui/components/icon'

import { FADE_IN_ANIMATION_SETTINGS } from '@/constants/framer-motion'

export default function BankTransfer(): JSX.Element {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <div className='flex items-center space-x-4'>
        <Label className='grow space-x-1.5 font-medium' htmlFor='bank-transfer'>
          <Landmark className='size-8' />

          <span className='font-medium text-base'>Bank transfer</span>
        </Label>

        <Switch id='bank-transfer' onClick={() => setExpanded(!expanded)} />
      </div>

      {expanded ? (
        <motion.div className='space-y-4' {...FADE_IN_ANIMATION_SETTINGS}>
          <div className='grid grid-cols-2 gap-3'>
            <div className='space-y-2'>
              <Label>Account holder name</Label>

              <Input type='text' />
            </div>

            <div className='space-y-2'>
              <Label>
                NUBAN{' '}
                <span className='text-[10px] text-muted-foreground'>/</span>{' '}
                Account number
              </Label>

              <Input type='text' />
            </div>

            <div className='space-y-2'>
              <Label>Bank name</Label>

              <Select
                defaultValue='nubank'
                // onValueChange={}
              >
                <Select.Trigger>
                  <Select.Value />
                </Select.Trigger>

                <Select.Content>
                  <Select.Item value='nubank'>Nubank</Select.Item>
                </Select.Content>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Bank code</Label>

              <Input type='text' />
            </div>

            <div className='space-y-2'>
              <Label>Branch code</Label>

              <Input type='text' />
            </div>
          </div>
        </motion.div>
      ) : null}
    </>
  )
}

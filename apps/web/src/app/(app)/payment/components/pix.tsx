import { type JSX, useState } from 'react'
import { motion } from 'framer-motion'

import Label from '@acme/ui/components/label'
import Switch from '@acme/ui/components/switch'
import Select from '@acme/ui/components/select'
import Input from '@acme/ui/components/input'
import { Pix as PixIcon } from '@acme/ui/components/logo'

import { FADE_IN_ANIMATION_SETTINGS } from '@/constants/framer-motion'

export default function Pix(): JSX.Element {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <div className='flex items-center space-x-4'>
        <Label className='grow space-x-1.5 font-medium' htmlFor='pix'>
          <PixIcon className='size-8' />

          <span className='font-medium text-base'>Pix</span>
        </Label>

        <Switch id='pix' onClick={() => setExpanded(!expanded)} />
      </div>

      {expanded ? (
        <motion.div className='space-y-4' {...FADE_IN_ANIMATION_SETTINGS}>
          <div className='grid grid-cols-3 space-x-3'>
            <div className='space-y-2'>
              <Label>ID type</Label>

              <Select
                defaultValue='email'
                // onValueChange={}
              >
                <Select.Trigger>
                  <Select.Value />
                </Select.Trigger>

                <Select.Content>
                  <Select.Item value='phone-number'>Phone number</Select.Item>
                  <Select.Item value='email'>Email</Select.Item>
                  <Select.Item value='cpf'>CPF</Select.Item>
                  <Select.Item value='cnpj'>CNPJ</Select.Item>
                </Select.Content>
              </Select>
            </div>

            <div className='col-span-2 space-y-2'>
              <Label>Email</Label>

              <Input placeholder='johndoe@example.com' type='email' />
            </div>
          </div>
        </motion.div>
      ) : null}
    </>
  )
}

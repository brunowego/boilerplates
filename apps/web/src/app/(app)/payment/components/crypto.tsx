import { type JSX, useState } from 'react'
import { motion } from 'framer-motion'

import Label from '@acme/ui/components/label'
import Switch from '@acme/ui/components/switch'
import Select from '@acme/ui/components/select'
import Input from '@acme/ui/components/input'
import { Bitcoin, X } from '@acme/ui/components/icon'
import Table from '@acme/ui/components/table'
import Button from '@acme/ui/components/button'

import { FADE_IN_ANIMATION_SETTINGS } from '@/constants/framer-motion'
import {} from '@acme/ui'

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
          <div className='flex space-x-3'>
            <div className='w-full max-w-32 space-y-2'>
              <Label>Crypto</Label>

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
                  <Select.Item value='usdt'>USDT</Select.Item>
                </Select.Content>
              </Select>
            </div>

            <div className='w-full space-y-2'>
              <Label>Wallet address</Label>

              <Input type='text' />
            </div>

            <Button className='!px-6 self-end'>Add</Button>
          </div>

          <div className='-mx-5 relative'>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Crypto</Table.Head>
                  <Table.Head>Wallet address</Table.Head>
                  <Table.Head />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>Bitcoin</Table.Cell>
                  <Table.Cell>1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2</Table.Cell>
                  <Table.Cell className='text-right'>
                    <X className='size-4 text-muted-foreground' />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </motion.div>
      ) : null}
    </>
  )
}

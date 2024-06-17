import type { JSX } from 'react'

import type { PaymentMethod } from '@acme/db/types'
import Label from '@acme/ui/components/label'
import Select from '@acme/ui/components/select'
import Input from '@acme/ui/components/input'
import { X } from '@acme/ui/components/icon'
import Table from '@acme/ui/components/table'
import Button from '@acme/ui/components/button'

import Option from './option'
type PaymentMethodProps = PaymentMethod

export default function Crypto({ enabled }: PaymentMethodProps): JSX.Element {
  return (
    <Option enabled={enabled} title='Crypto'>
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
    </Option>
  )
}

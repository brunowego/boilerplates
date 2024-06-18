import type { JSX } from 'react'

import type { PaymentMethod } from '@acme/db/types'
import { Landmark as Icon } from '@acme/ui/components/icon'
import Label from '@acme/ui/components/label'
import Input from '@acme/ui/components/input'
import Select from '@acme/ui/components/select'

import Option from './option'

type BankTransferProps = PaymentMethod

export default function BankTransfer({
  enabled,
  identifier,
  // params,
}: BankTransferProps): JSX.Element {
  return (
    <Option
      enabled={enabled}
      icon={<Icon className='m-1 size-6' />}
      title='Bank transfer'
      type='bank_transfer'
    >
      <div className='grid grid-cols-2 gap-3'>
        <div className='space-y-2'>
          <Label>Account holder name</Label>

          <Input
            defaultValue={identifier as string}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
            }}
            type='text'
          />
        </div>

        <div className='space-y-2'>
          <Label>
            NUBAN <span className='text-[10px] text-muted-foreground'>/</span>{' '}
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
    </Option>
  )
}

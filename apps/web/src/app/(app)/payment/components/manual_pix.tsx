import { type JSX, useState } from 'react'

import type { PaymentMethod, PAYMENT_METHOD_IDENTIFIER_TYPES } from '@acme/db'
import { Pix as Logo } from '@acme/ui/components/logo'
import Form from '@acme/ui/components/form'
import Label from '@acme/ui/components/label'
import Select from '@acme/ui/components/select'
import Input from '@acme/ui/components/input'
import _PhoneNumberInput from '@acme/ui/components/phone-number-input'
import _SSNInput from '@acme/ui/components/ssn-input'
import _EINInput from '@acme/ui/components/ein-input'
import _UUIDInput from '@acme/ui/components/uuid-input'

import Option from './option'

type IdentifierType = (typeof PAYMENT_METHOD_IDENTIFIER_TYPES)[number]

const identifierTypes = [
  'phone_number',
  'email',
  'ssn', // CPF
  'ein', // CNPJ
  'random_key',
]

const labels = {
  phone_number: 'Phone number',
  email: 'Email',
  ssn: 'CPF',
  ein: 'CNPJ',
  random_key: 'Random key',
} as Record<IdentifierType, string>

type PixProps = PaymentMethod & {
  control: any
  index: number
}

export default function Pix({
  enabled,
  identifier,
  identifierType = 'ssn',
  control,
  index,
}: PixProps): JSX.Element {
  // const [type, setType] = useState<IdentifierType | null>(identifierType)

  // const getValue = identifierType === type ? (identifier as string) : ''

  return (
    <Option
      enabled={enabled}
      icon={<Logo className='size-8' />}
      title='Pix'
      type='manual_pix'
    >
      <div className='grid grid-cols-3 space-x-3'>
        <Form.Field
          control={control}
          name={`methods.${index}.identifierType`}
          render={({ field: { value, onChange } }) => (
            <Form.Item className='grow'>
              <Form.Label>ID type</Form.Label>

              <Form.Control>
                {/* <Input type='text' {...field} /> */}
                <Select defaultValue={value} onValueChange={(v) => onChange(v)}>
                  <Select.Trigger>
                    <Select.Value />
                  </Select.Trigger>

                  <Select.Content>
                    {identifierTypes.map((type) => (
                      <Select.Item key={type} value={type}>
                        {labels[type as IdentifierType]}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
              </Form.Control>

              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={control}
          name={`methods.${index}.identifier`}
          render={({ field }) => (
            <Form.Item className='col-span-2'>
              <Form.Label>Identifier</Form.Label>

              <Form.Control>
                <Input type='text' {...field} />
              </Form.Control>

              <Form.Message />
            </Form.Item>
          )}
        />
      </div>
    </Option>
  )
}

type InputProps = {
  value: string
}

const PhoneNumberInput = ({ value }: InputProps) => {
  return (
    <>
      <Label>Phone number</Label>

      <_PhoneNumberInput defaultValue={value} />
    </>
  )
}

const EmailInput = ({ value }: InputProps) => {
  return (
    <>
      <Label>Email</Label>

      <Input
        defaultValue={value}
        placeholder='johndoe@example.com'
        type='email'
      />
    </>
  )
}

const SSNInput = ({ value }: InputProps) => {
  return (
    <>
      <Label>CPF</Label>

      <_SSNInput defaultValue={value} placeholder='000.000.000-00' />
    </>
  )
}

const EINInput = ({ value }: InputProps) => {
  return (
    <>
      <Label>CNPJ</Label>

      <_EINInput defaultValue={value} placeholder='00.000.000/0000-00' />
    </>
  )
}

const RandonKeyInput = ({ value }: InputProps) => {
  return (
    <>
      <Label>Randon key</Label>

      <_UUIDInput
        defaultValue={value}
        placeholder='00000000-0000-0000-0000-000000000000'
      />
    </>
  )
}

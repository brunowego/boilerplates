import { type JSX, useState } from 'react'

import type { PaymentMethod, PAYMENT_METHOD_IDENTIFIER_TYPES } from '@acme/db'
import { Pix as Logo } from '@acme/ui/components/logo'
import Label from '@acme/ui/components/label'
import Select from '@acme/ui/components/select'
import Input from '@acme/ui/components/input'

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

type PixProps = PaymentMethod

export default function Pix({
  enabled,
  identifier,
  identifierType,
}: PixProps): JSX.Element {
  const [type, setType] = useState<IdentifierType | null>(identifierType)

  const getValue = identifierType === type ? (identifier as string) : ''

  return (
    <Option enabled={enabled} icon={<Logo className='size-8' />} title='Pix'>
      <div className='grid grid-cols-3 space-x-3'>
        <div className='space-y-2'>
          <Label>ID type</Label>

          <Select
            defaultValue={identifierType as string}
            onValueChange={(value) => setType(value as IdentifierType)}
          >
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
        </div>

        <div className='col-span-2 space-y-2'>
          {type === 'phone_number' && <PhoneNumberInput value={getValue} />}

          {type === 'email' && <EmailInput value={getValue} />}

          {type === 'ssn' && <SSNInput value={getValue} />}

          {type === 'ein' && <EINInput value={getValue} />}

          {type === 'random_key' && <RandonKeyInput value={getValue} />}
        </div>
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

      <Input defaultValue={value} type='text' />
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

      <Input defaultValue={value} placeholder='000.000.000-00' type='text' />
    </>
  )
}

const EINInput = ({ value }: InputProps) => {
  return (
    <>
      <Label>CNPJ</Label>

      <Input
        defaultValue={value}
        placeholder='00.000.000/0000-00'
        type='text'
      />
    </>
  )
}

const RandonKeyInput = ({ value }: InputProps) => {
  return (
    <>
      <Label>Randon key</Label>

      <Input defaultValue={value} type='text' />
    </>
  )
}

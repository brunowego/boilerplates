import { type JSX, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { type Control, useWatch } from '@acme/ui/hooks/use-form'
import type { PaymentMethod, PAYMENT_METHOD_IDENTIFIER_TYPES } from '@acme/db'
import { Pix as Logo } from '@acme/ui/components/logo'
import Label from '@acme/ui/components/label'
import Switch from '@acme/ui/components/switch'
import Form from '@acme/ui/components/form'
import Select from '@acme/ui/components/select'
import Skeleton from '@acme/ui/components/skeleton'
import Input from '@acme/ui/components/input'
import PhoneNumberInput from '@acme/ui/components/phone-number-input'
import SSNInput from '@acme/ui/components/ssn-input'
import EINInput from '@acme/ui/components/ein-input'
import UUIDInput from '@acme/ui/components/uuid-input'

import { FADE_IN_ANIMATION_SETTINGS } from '@/constants/framer-motion'

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

type ManualPixProps = PaymentMethod & {
  control: Control
  index: number
}

export default function ManualPix({
  control,
  identifierType,
  identifier,
  index,
}: ManualPixProps): JSX.Element {
  const [value, setValue] = useState<string>(identifier as string)
  const [loading, isLoading] = useState<boolean>(false)

  const fieldsValues = useWatch({
    control,
  })

  const type = fieldsValues.methods[index].identifierType ?? 'ssn'
  const enabled = fieldsValues.methods[index].enabled

  useEffect(() => {
    identifierType !== type ? setValue('') : setValue(identifier as string)
    isLoading(false)
  }, [type])

  return (
    <>
      <div className='flex items-center space-x-4'>
        <Label className='grow space-x-1.5 font-medium' htmlFor='manual_pix'>
          <Logo className='size-8' />

          <span className='font-medium text-base'>Pix</span>
        </Label>

        <Form.Field
          control={control}
          name={`methods.${index}.enabled`}
          render={({ field: { value, onChange } }) => (
            <Form.Item>
              <Form.Control>
                <Switch
                  checked={Boolean(value)}
                  id='manual_pix'
                  onCheckedChange={(v) => onChange(v)}
                />
              </Form.Control>
            </Form.Item>
          )}
        />
      </div>

      {enabled ? (
        <motion.div className='space-y-4' {...FADE_IN_ANIMATION_SETTINGS}>
          <div className='grid grid-cols-3 space-x-3'>
            <Form.Field
              control={control}
              name={`methods.${index}.identifierType`}
              render={({ field: { value, onChange } }) => (
                <Form.Item className='grow'>
                  <Form.Label>ID type</Form.Label>

                  <Form.Control>
                    <Select
                      defaultValue='ssn'
                      value={value}
                      onValueChange={(v) => {
                        onChange(v)
                        isLoading(true)
                      }}
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
                  </Form.Control>

                  <Form.Message />
                </Form.Item>
              )}
            />

            <Form.Field
              control={control}
              name={`methods.${index}.identifier`}
              render={({ field: { onChange } }) => (
                <Form.Item className='col-span-2'>
                  <Form.Label>{labels[type as IdentifierType]}</Form.Label>

                  <Form.Control>
                    {loading ? (
                      <Skeleton className='h-10' />
                    ) : (
                      <>
                        {type === 'phone_number' ? (
                          <PhoneNumberInput
                            value={value}
                            onChange={(v) => onChange(v)}
                          />
                        ) : null}

                        {type === 'email' ? (
                          <Input
                            defaultValue={value}
                            onChange={(v) => onChange(v)}
                            placeholder='johndoe@example.com'
                            type='email'
                          />
                        ) : null}

                        {type === 'ssn' ? (
                          <SSNInput
                            defaultValue={value}
                            onChange={(v) => onChange(v)}
                            placeholder='000.000.000-00'
                          />
                        ) : null}

                        {type === 'ein' ? (
                          <EINInput
                            defaultValue={value}
                            onChange={(v) => onChange(v)}
                            placeholder='00.000.000/0000-00'
                          />
                        ) : null}

                        {type === 'random_key' ? (
                          <UUIDInput
                            defaultValue={value}
                            onChange={(v) => onChange(v)}
                            placeholder='00000000-0000-0000-0000-000000000000'
                          />
                        ) : null}
                      </>
                    )}
                  </Form.Control>

                  <Form.Message />
                </Form.Item>
              )}
            />
          </div>
        </motion.div>
      ) : null}
    </>
  )
}

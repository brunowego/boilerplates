'use client'

import { type JSX, useState } from 'react'

import Label from '@acme/ui/components/label'

import PhoneInput from './phone-input'

export default function Form(): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState('+5561982502595')

  return (
    <>
      <div className='space-y-2'>
        <Label>Phone number</Label>

        <PhoneInput
          className='max-w-80'
          onChange={(value) => setPhoneNumber(value || '')}
          value={phoneNumber}
        />
      </div>

      <pre>
        <code>{JSON.stringify(phoneNumber)}</code>
      </pre>
    </>
  )
}

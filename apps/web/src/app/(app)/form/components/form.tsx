'use client'

import { type JSX, useState } from 'react'
import Link from 'next/link'

import Label from '@acme/ui/components/label'
import Input, { inputVariants } from '@acme/ui/components/input'
import InfoTooltip from '@acme/ui/components/info-tooltip'
import Tooltip from '@acme/ui/components/tooltip'
import PhoneInput from '@acme/ui/components/phone-input'
import ZipCodeInput from '@acme/ui/components/zip-code-input'
import SSNInput from '@acme/ui/components/ssn-input'
import EINInput from '@acme/ui/components/ein-input'
import UUIDInput from '@acme/ui/components/uuid-input'
import CurrencyInput from '@acme/ui/components/currency-input'
import Button from '@acme/ui/components/button'
import FieldLength from '@acme/ui/components/field-length'
import ToggleGroup from '@acme/ui/components/toggle-group'

export default function Form(): JSX.Element {
  const [titleLength, setTitleLength] = useState(0)

  return (
    <>
      <div className='space-y-2'>
        <Label>Domain</Label>

        <Input placeholder='go.acme.com' />
      </div>

      <div className='space-y-2'>
        <Label>
          <span>Destination URL</span>

          <InfoTooltip>
            The page your users will get redirected to when they visit your
            domain.{' '}
            <Link
              className='underline underline-offset-4'
              href='/'
              onClick={(e) => e.stopPropagation()}
              rel='noopener noreferrer'
              target='_blank'
            >
              Learn more.
            </Link>
          </InfoTooltip>
        </Label>

        <Input placeholder='https://yourdomain.com' />
      </div>

      <div className='space-y-2'>
        <Label>Destination URL</Label>

        <Tooltip>
          <Tooltip.Trigger asChild>
            <div
              className={inputVariants({
                className:
                  '!bg-background cursor-not-allowed items-center text-muted-foreground',
              })}
            >
              https://yourdomain.com
            </div>
          </Tooltip.Trigger>

          <Tooltip.Content className='max-w-xs p-4 text-center text-sm leading-6'>
            <p className='mb-4'>
              You can't configure a custom landing page on a free plan. Upgrade
              to a Pro plan to proceed.
            </p>

            <Button className='w-full' variant='secondary'>
              Upgrade to pro
            </Button>
          </Tooltip.Content>
        </Tooltip>
      </div>

      <div className='space-y-2'>
        <Label>
          Title{' '}
          <FieldLength
            // currentLength={field.value.length ?? 0}
            currentLength={titleLength}
            maxLength={60}
          />
        </Label>

        <Input
          maxLength={60}
          onChange={(value) => setTitleLength(value.target.value.length)}
          type='text'
        />
      </div>

      <div className='space-y-2'>
        <Label>Phone number</Label>

        <PhoneInput className='max-w-80' />
      </div>

      <div className='space-y-2'>
        <Label>Zip Code</Label>

        <ZipCodeInput className='max-w-80' />
      </div>

      <div className='space-y-2'>
        <Label>CPF</Label>

        <SSNInput className='max-w-80' />
      </div>

      <div className='space-y-2'>
        <Label>CNPJ</Label>

        <EINInput className='max-w-80' />
      </div>

      <div className='space-y-2'>
        <Label>UUID</Label>

        <UUIDInput className='max-w-80' />
      </div>

      <div className='space-y-2'>
        <Label>Currency</Label>

        <CurrencyInput
          className='max-w-80'
          defaultValue={0.0}
          onValueChange={(value, name, values) =>
            console.log(value, name, values)
          }
          placeholder='R$ 0,00'
        />
      </div>

      <div className='space-y-2'>
        <Label>Toggle Group</Label>

        <ToggleGroup className='max-w-80' type='single'>
          <ToggleGroup.Item className='w-full' value='test'>
            Test
          </ToggleGroup.Item>
          <ToggleGroup.Item className='w-full' value='test2'>
            Test2
          </ToggleGroup.Item>
        </ToggleGroup>
      </div>
    </>
  )
}

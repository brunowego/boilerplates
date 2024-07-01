'use client'

import {
  usePhoneInput,
  defaultCountries,
  FlagImage,
  type CountryIso2,
  parseCountry,
} from 'react-international-phone'

import Input, { type InputProps } from './input'
import Popover from './popover'
import cn from '../utils/cn'
import Command from './command'
import { ChevronDown } from './icon'

export type PhoneInputProps = Omit<InputProps, 'value' | 'onChange'> & {
  countrySearch?: boolean
  value?: string | undefined
  onChange?: (phone: string | undefined) => void
}

export default function PhoneInput({
  countrySearch = false,
  value,
  onChange,
  className,
  ...rest
}: PhoneInputProps) {
  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country)

    return ['pt', 'br', 'us'].includes(iso2)
  })

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: 'br',
      value,
      countries,
      onChange: (data) => {
        if (onChange) {
          onChange(data.phone)
        }
      },
    })

  return (
    <div className='relative'>
      <Popover>
        <Popover.Trigger asChild>
          <button
            className='absolute inset-y-0 left-4 flex items-center space-x-1 focus-visible:outline-none'
            type='button'
          >
            <FlagImage iso2={country.iso2 as CountryIso2} className='size-6' />

            <ChevronDown className='size-3.5 text-muted-foreground' />
          </button>
        </Popover.Trigger>

        <Popover.Content align='start' className='-ml-4 w-96 p-0'>
          <Command
            filter={(value, search) => {
              const sanitizedSearch = search.replace(
                /[-\/\\^$*+?.()|[\]{}]/g,
                '\\$&',
              )
              const searchRegex = new RegExp(sanitizedSearch, 'i')

              const countryName = countries.find(
                (c) => parseCountry(c).iso2 === value,
              )

              return searchRegex.test(
                countryName ? parseCountry(countryName).name : '',
              )
                ? 1
                : 0
            }}
          >
            <Command.Input placeholder='Search countries...' />

            <Command.Empty>No country found.</Command.Empty>

            <Command.List>
              {countries.map((c) => {
                const item = parseCountry(c)

                return (
                  <Command.Item
                    className={cn(
                      'flex items-center justify-between',
                      country.name === item.name && 'bg-accent',
                    )}
                    key={item.iso2}
                    onSelect={() => {
                      setCountry(item.iso2)
                    }}
                    value={item.iso2}
                  >
                    <div className='flex gap-x-2 text-sm'>
                      <FlagImage iso2={item.iso2} className='size-5' />

                      {item.name}
                    </div>

                    <div
                      className={cn(
                        'text-sm',
                        country.name === item.name
                          ? 'text-foreground'
                          : 'text-muted-foreground',
                      )}
                    >
                      +{item.dialCode}
                    </div>
                  </Command.Item>
                )
              })}
            </Command.List>
          </Command>
        </Popover.Content>
      </Popover>

      <Input
        className={cn('h-12 appearance-none pl-16', className)}
        onChange={handlePhoneValueChange}
        ref={inputRef}
        type='tel'
        value={inputValue}
        {...rest}
      />
    </div>
  )
}

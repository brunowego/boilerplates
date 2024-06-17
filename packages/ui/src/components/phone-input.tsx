'use client'

import {
  usePhoneInput,
  defaultCountries,
  FlagImage,
  type CountryIso2,
  parseCountry,
} from 'react-international-phone'

import Input, { type InputProps } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import cn from '../lib/cn'
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandList,
  CommandItem,
} from './command'
import { ChevronDown } from './icon'

export interface PhoneInputProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  countrySearch?: boolean
  value?: string | undefined
  onChange?: (phone: string | undefined) => void
}
const PhoneInput = ({
  countrySearch = false,
  value,
  onChange,
  className,
  ...rest
}: PhoneInputProps) => {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: 'br',
      value,
      countries: defaultCountries,
      onChange: (data) => {
        if (onChange) {
          onChange(data.phone)
        }
      },
    })

  return (
    <div className='relative'>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className='absolute inset-y-0 left-4 flex items-center space-x-1'
            type='button'
          >
            <FlagImage iso2={country.iso2 as CountryIso2} className='size-6' />

            <ChevronDown className='size-3.5 text-muted-foreground' />
          </button>
        </PopoverTrigger>

        <PopoverContent align='start' className='-ml-4 w-96 p-0'>
          <Command>
            <CommandInput placeholder='Search countries...' />

            <CommandEmpty>No country found.</CommandEmpty>

            <CommandList>
              {defaultCountries.map((c) => {
                const item = parseCountry(c)

                return (
                  <CommandItem
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
                  </CommandItem>
                )
              })}
            </CommandList>
          </Command>
        </PopoverContent>
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

export default PhoneInput

'use client'

import {
  usePhoneInput,
  defaultCountries,
  FlagImage,
  type CountryIso2,
  parseCountry,
} from 'react-international-phone'

import Input, { type InputProps } from '@acme/ui/components/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@acme/ui/components/popover'
import Button from '@acme/ui/components/button'
import cn from '@acme/ui/lib/cn'
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandList,
  CommandItem,
} from '@acme/ui/components/command'
import { ChevronDown } from '@acme/ui/components/icon'
// import { ScrollArea } from '@acme/ui/components/scroll-area'

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
    <div className='relative h-12 w-full'>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              'absolute top-2 left-2.5 h-[calc(100%-1rem)] w-12 justify-between rounded-xs pr-1 pl-2',
            )}
            role='combobox'
            size='icon'
            variant='secondary'
          >
            <FlagImage iso2={country.iso2 as CountryIso2} className='size-5' />

            <ChevronDown className='size-3' />
          </Button>
        </PopoverTrigger>

        <PopoverContent align='start' className='-ml-2 mt-2 w-96 p-0'>
          <Command>
            <CommandInput placeholder='Search countries...' />

            <CommandEmpty>No country found.</CommandEmpty>

            <CommandList>
              {/* <ScrollArea className='p-1'> */}
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
              {/* </ScrollArea> */}
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

import {
  type InputHTMLAttributes,
  type ForwardRefExoticComponent,
  type ElementRef,
  type JSX,
  forwardRef,
  useCallback,
} from 'react'
import * as RPNInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

import cn from '@acme/ui/utils/cn'
import Command from '@acme/ui/components/command'
import Popover from '@acme/ui/components/popover'
import Button from '@acme/ui/components/button'
import Input, { type InputProps } from '@acme/ui/components/input'
import { CheckIcon, ChevronsUpDown } from '@acme/ui/components/icon'
import { ScrollArea } from '@acme/ui/components/scroll-area'

type PhoneInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void
  }

const PhoneInput: ForwardRefExoticComponent<PhoneInputProps> = forwardRef<
  ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, onChange, ...props }, ref): JSX.Element => {
  return (
    <RPNInput.default
      className={cn('flex', className)}
      countries={['US', 'BR', 'DE', 'AR']}
      countrySelectComponent={CountrySelect}
      flagComponent={FlagComponent}
      inputComponent={InputComponent}
      onChange={(value) => onChange?.(value || ('' as RPNInput.Value))}
      ref={ref}
      {...props}
    />
  )
})
PhoneInput.displayName = 'PhoneInput'

const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref): JSX.Element => (
    <Input
      className={cn('h-12 rounded-s-none rounded-e-md', className)}
      {...props}
      ref={ref}
    />
  ),
)
InputComponent.displayName = 'InputComponent'

type CountrySelectOption = { label: string; value: RPNInput.Country }

type CountrySelectProps = {
  disabled?: boolean
  value: RPNInput.Country
  onChange: (value: RPNInput.Country) => void
  options: CountrySelectOption[]
}

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = useCallback(
    (country: RPNInput.Country) => {
      onChange(country)
    },
    [onChange],
  )

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button
          className='flex h-12 gap-1 rounded-s-md rounded-e-none px-3'
          disabled={disabled}
          type='button'
          variant='outline'
        >
          <FlagComponent country={value} countryName={value} />

          <ChevronsUpDown
            className={cn(
              '-mr-2 size-4 opacity-50',
              disabled ? 'hidden' : 'opacity-100',
            )}
          />
        </Button>
      </Popover.Trigger>

      <Popover.Content align='start' className='w-80 p-0'>
        <Command>
          <Command.List>
            <ScrollArea className='h-72'>
              <Command.Input placeholder='Search country...' />

              <Command.Empty>No country found.</Command.Empty>

              <Command.Group>
                {options
                  .filter((x) => x.value)
                  .map((option) => (
                    <Command.Item
                      className='gap-2'
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <FlagComponent
                        country={option.value}
                        countryName={option.label}
                      />
                      <span className='flex-1 text-sm'>{option.label}</span>

                      {option.value && (
                        <span className='text-foreground/50 text-sm'>
                          {`+${RPNInput.getCountryCallingCode(option.value)}`}
                        </span>
                      )}

                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          option.value === value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </Command.Item>
                  ))}
              </Command.Group>
            </ScrollArea>
          </Command.List>
        </Command>
      </Popover.Content>
    </Popover>
  )
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country]

  return (
    <span className='flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20'>
      {Flag && <Flag title={countryName} />}
    </span>
  )
}
FlagComponent.displayName = 'FlagComponent'

export { PhoneInput as default }

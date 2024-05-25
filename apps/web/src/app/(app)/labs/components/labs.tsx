'use client'

import RadioGroup from '@acme/ui/components/radio-group'
import Label from '@acme/ui/components/label'
import { buttonVariants } from '@acme/ui/components/button'

export default function Labs(): JSX.Element {
  return (
    <RadioGroup className='flex gap-0 divide-x' defaultValue='option-one'>
      <div>
        <RadioGroup.Item
          className='peer sr-only'
          id='option-one'
          value='option-one'
        />

        <Label
          className={buttonVariants({
            className:
              'w-full cursor-pointer rounded-r-none peer-data-[state=checked]:bg-border',
            variant: 'secondary',
          })}
          htmlFor='option-one'
        >
          Option One
        </Label>
      </div>

      <div>
        <RadioGroup.Item
          className='peer sr-only'
          id='option-two'
          value='option-two'
        />

        <Label
          className={buttonVariants({
            className:
              'w-full cursor-pointer rounded-l-none peer-data-[state=checked]:bg-border',
            variant: 'secondary',
          })}
          htmlFor='option-two'
        >
          Option Two
        </Label>
      </div>
    </RadioGroup>
  )
}

import { CheckCircle } from '@acme/ui/components/icon'
import { buttonVariants } from '@acme/ui/components/button'
import cn from '@acme/ui/utils/cn'

import type { FieldPropsInternal } from '../'

export const RadioField = ({
  field,
  onChange,
  readOnly,
  value,
  name,
  id,
  label,
  Label,
}: FieldPropsInternal) => {
  if (field.type !== 'radio' || !field.options) {
    return null
  }

  return (
    <Label
      el='div'
      icon={<CheckCircle className='size-4' />}
      label={label || name}
      readOnly={readOnly}
    >
      <div className='flex divide-x' id={id}>
        {field.options.map((option) => (
          <label
            className={buttonVariants({
              className: cn(
                'w-full cursor-pointer rounded-none last-of-type:rounded-r first-of-type:rounded-l',
                value === option.value ? '!bg-border' : null,
              ),
              variant: 'secondary',
            })}
            key={option.label + option.value}
          >
            <input
              className='sr-only'
              checked={value === option.value}
              disabled={readOnly}
              name={name}
              onChange={(e) => {
                if (
                  e.currentTarget.value === 'true' ||
                  e.currentTarget.value === 'false'
                ) {
                  onChange(JSON.parse(e.currentTarget.value))

                  return
                }

                onChange(e.currentTarget.value)
              }}
              type='radio'
              value={option.value as string | number}
            />

            <span>{option.label || option.value}</span>
          </label>
        ))}
      </div>
    </Label>
  )
}

import { ChevronDown } from '@acme/ui/components/icon'

import Select from '@acme/ui/components/select'

import type { FieldPropsInternal } from '../'

export const SelectField = ({
  field,
  onChange,
  label,
  Label,
  value,
  name,
  readOnly,
  id,
}: FieldPropsInternal) => {
  if (field.type !== 'select' || !field.options) {
    return null
  }

  return (
    <Label
      icon={<ChevronDown className='size-4' />}
      label={label || name}
      readOnly={readOnly}
    >
      <Select defaultValue={value}>
        <Select.Trigger
          disabled={readOnly}
          id={id}
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
        >
          <Select.Value />
        </Select.Trigger>

        <Select.Content>
          {field.options.map(({ label, value }) => (
            <Select.Item key={label + value} value={value as string}>
              {label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </Label>
  )
}

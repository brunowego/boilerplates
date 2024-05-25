import { Hash, Type } from '@acme/ui/components/icon'
import { inputVariants } from '@acme/ui/components/input'

import type { FieldPropsInternal } from '../'

export const DefaultField = ({
  field,
  onChange,
  readOnly,
  value,
  name,
  label,
  Label,
  id,
}: FieldPropsInternal) => {
  return (
    <Label
      label={label || name}
      icon={
        <>
          {field.type === 'text' && <Type className='size-4' />}
          {field.type === 'number' && <Hash className='size-4' />}
        </>
      }
      readOnly={readOnly}
    >
      <input
        autoComplete='off'
        className={inputVariants()}
        id={id}
        max={field.type === 'number' ? field.max : undefined}
        min={field.type === 'number' ? field.min : undefined}
        name={name}
        onChange={(e) => {
          if (field.type === 'number') {
            onChange(Number(e.currentTarget.value))
          } else {
            onChange(e.currentTarget.value)
          }
        }}
        readOnly={readOnly}
        tabIndex={readOnly ? -1 : undefined}
        type={field.type}
        value={typeof value === 'undefined' ? '' : value}
      />
    </Label>
  )
}

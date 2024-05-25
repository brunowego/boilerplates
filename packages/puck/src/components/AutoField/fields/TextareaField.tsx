import { Type } from '@acme/ui/components/icon'

import { textareaVariants } from '@acme/ui/components/textarea'

import type { FieldPropsInternal } from '../'

export const TextareaField = ({
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
      icon={<Type className='size-4' />}
      label={label || name}
      readOnly={readOnly}
    >
      <textarea
        autoComplete='off'
        className={textareaVariants()}
        id={id}
        name={name}
        onChange={(e) => onChange(e.currentTarget.value)}
        readOnly={readOnly}
        rows={5}
        tabIndex={readOnly ? -1 : undefined}
        value={typeof value === 'undefined' ? '' : value}
      />
    </Label>
  )
}

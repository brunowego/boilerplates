import { Type } from '@acme/ui/components/icon'

import RichTextInput from '@acme/ui/components/rich-text-input'

import type { FieldPropsInternal } from '..'

export const RichTextField = ({
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
      el='div'
      icon={<Type className='size-4' />}
      label={label || name}
      readOnly={readOnly}
    >
      <RichTextInput
        id={id}
        name={name}
        onChange={(html) => onChange(html)}
        readOnly={readOnly}
        tabIndex={readOnly ? -1 : undefined}
        value={typeof value === 'undefined' ? '' : value}
      />
    </Label>
  )
}

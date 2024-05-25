import { Paintbrush } from '@acme/ui/components/icon'

import ColorInput from '@acme/ui/components/color-input'

import type { FieldPropsInternal } from '../'

export const ColorField = ({
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
      icon={<Paintbrush className='size-4' />}
      label={label || name}
      readOnly={readOnly}
    >
      <ColorInput
        id={id}
        name={name as string}
        onChange={onChange}
        readOnly={readOnly}
        tabIndex={readOnly ? -1 : undefined}
        value={typeof value === 'undefined' ? '' : value}
      />
    </Label>
  )
}

import { TailwindCSS } from '@acme/ui/components/logo'
import Textarea from '@acme/ui/components/textarea'

import type { FieldPropsInternal } from '../'

export const TailwindCSSField = ({
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
      icon={<TailwindCSS className='size-4' />}
      label={label || name}
      readOnly={readOnly}
    >
      <Textarea
        autoComplete='off'
        id={id}
        name={name}
        onChange={(e) => onChange(e.currentTarget.value)}
        readOnly={readOnly}
        tabIndex={readOnly ? -1 : undefined}
        value={typeof value === 'undefined' ? '' : value}
      />
    </Label>
  )
}

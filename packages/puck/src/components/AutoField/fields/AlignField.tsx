import Button from '@acme/ui/components/button'
import {
  AlignLeft,
  AlignHorizontalCenter,
  AlignRight,
  AlignTop,
  AlignVerticalCenter,
  AlignBottom,
} from '@acme/ui/components/icon-align'

import type { FieldPropsInternal } from '../'

export const AlignField = ({
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
      icon={<AlignLeft className='size-4' />}
      label={label || name}
      readOnly={readOnly}
    >
      {/* <textarea
        id={id}
        name={name}
        onChange={(e) => onChange(e.currentTarget.value)}
        readOnly={readOnly}
        tabIndex={readOnly ? -1 : undefined}
        value={typeof value === 'undefined' ? '' : value}
      /> */}

      <div className='grid grid-cols-6 gap-x-1.5'>
        <Button variant='outline'>
          <AlignLeft className='size-5 shrink-0' />
        </Button>

        <Button variant='outline'>
          <AlignHorizontalCenter className='size-5 shrink-0' />
        </Button>

        <Button variant='outline'>
          <AlignRight className='size-5 shrink-0' />
        </Button>

        <Button variant='outline'>
          <AlignTop className='size-5 shrink-0' />
        </Button>

        <Button variant='outline'>
          <AlignVerticalCenter className='size-5 shrink-0' />
        </Button>

        <Button variant='outline'>
          <AlignBottom className='size-5 shrink-0' />
        </Button>
      </div>
    </Label>
  )
}

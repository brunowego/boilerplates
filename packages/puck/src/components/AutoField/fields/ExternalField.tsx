import { useEffect } from 'react'

import { Link } from '@acme/ui/components/icon'

import type { FieldPropsInternal } from '../'
import type {
  ExternalField as ExternalFieldType,
  ExternalFieldWithAdaptor,
} from '../../../types/Fields'
import { ExternalInput } from '../../ExternalInput'

export const ExternalField = ({
  field,
  onChange,
  value,
  name,
  label,
  Label,
  id,
}: FieldPropsInternal) => {
  // DEPRECATED
  const validField = field as ExternalFieldType
  const deprecatedField = field as ExternalFieldWithAdaptor

  useEffect(() => {
    if (deprecatedField.adaptor) {
      console.error(
        'Warning: The `adaptor` API is deprecated. Please use updated APIs on the `external` field instead. This will be a breaking change in a future release.',
      )
    }
  }, [])

  if (field.type !== 'external') {
    return null
  }

  return (
    <Label label={label || name} icon={<Link className='size-4' />} el='div'>
      <ExternalInput
        id={id}
        field={{
          ...validField,
          // DEPRECATED

          placeholder: deprecatedField.adaptor?.name
            ? `Select from ${deprecatedField.adaptor.name}`
            : validField.placeholder || 'Select data',
          mapProp: deprecatedField.adaptor?.mapProp || validField.mapProp,
          mapRow: validField.mapRow,
          fetchList: deprecatedField.adaptor?.fetchList
            ? async () =>
                await deprecatedField.adaptor.fetchList(
                  deprecatedField.adaptorParams,
                )
            : validField.fetchList,
        }}
        name={name}
        onChange={onChange}
        value={value}
      />
    </Label>
  )
}

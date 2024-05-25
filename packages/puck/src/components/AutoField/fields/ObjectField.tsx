import { MoreVertical } from '@acme/ui/components/icon'

import { type FieldPropsInternal, AutoFieldPrivate } from '../'
import { useAppContext } from '../../Puck/context'

export const ObjectField = ({
  field,
  onChange,
  value,
  name,
  label,
  Label,
  readOnly,
  id,
}: FieldPropsInternal) => {
  const { selectedItem } = useAppContext()

  if (field.type !== 'object' || !field.objectFields) {
    return null
  }

  const readOnlyFields = selectedItem?.readOnly || {}

  const data = value || {}

  return (
    <Label
      el='div'
      icon={<MoreVertical className='size-4' />}
      label={label || name}
      readOnly={readOnly}
    >
      <fieldset className='rounded-sm bg-secondary'>
        {Object.keys(field.objectFields).map((fieldName) => {
          const subField = field.objectFields?.[fieldName]

          const subFieldName = `${name}.${fieldName}`
          const wildcardFieldName = `${name}.${fieldName}`

          return (
            <AutoFieldPrivate
              // @ts-ignore
              field={subField}
              id={`${id}_${fieldName}`}
              key={subFieldName}
              label={subField?.label || fieldName}
              name={subFieldName}
              onChange={(val, ui) => {
                onChange(
                  {
                    ...data,
                    [fieldName]: val,
                  },
                  ui,
                )
              }}
              readOnly={
                typeof readOnlyFields[subFieldName] !== 'undefined'
                  ? readOnlyFields[subFieldName]
                  : readOnlyFields[wildcardFieldName]
              }
              value={data[fieldName]}
            />
          )
        })}
      </fieldset>
    </Label>
  )
}

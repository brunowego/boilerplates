import {
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
} from 'react'
import { useDebouncedCallback } from 'use-debounce'

import cn from '@acme/ui/utils/cn'
import { Lock } from '@acme/ui/components/icon'

import type { Field, FieldProps } from '../../types/Fields'
import type { UiState } from '../../types/Config'
import {
  RadioField,
  SelectField,
  ExternalField,
  ArrayField,
  DefaultField,
  TextareaField,
  ColorField,
  RichTextField,
  SpacingField,
  AlignField,
  TailwindCSSField,
} from './fields'
import { ObjectField } from './fields/ObjectField'
import { useAppContext } from '../Puck/context'
import { useSafeId } from '../../lib/use-safe-id'

type FieldLabelProps = {
  children?: ReactNode
  icon?: ReactNode
  label: string
  el?: 'label' | 'div'
  readOnly?: boolean
  className?: string
}

export const FieldLabel = ({
  children,
  icon,
  label,
  el = 'label',
  readOnly,
  className,
}: FieldLabelProps) => {
  const El = el

  return (
    <El className={cn('block p-4', className)}>
      <h3 className='mb-4 flex items-center gap-x-2 font-medium text-muted-foreground text-sm'>
        {icon ? <>{icon}</> : null}

        {label}

        {readOnly ? <Lock className='ml-auto size-4' /> : null}
      </h3>

      {children}
    </El>
  )
}

type FieldLabelInternalProps = {
  children?: ReactNode
  icon?: ReactNode
  label?: string
  el?: 'label' | 'div'
  readOnly?: boolean
}

export const FieldLabelInternal = ({
  children,
  icon,
  label,
  el = 'label',
  readOnly,
}: FieldLabelInternalProps) => {
  const { overrides } = useAppContext()

  const Wrapper = useMemo(() => overrides.fieldLabel || FieldLabel, [overrides])

  if (!label) {
    return <>{children}</>
  }

  return (
    <Wrapper el={el} icon={icon} label={label} readOnly={readOnly}>
      {children}
    </Wrapper>
  )
}

type FieldPropsInternalOptional<ValueType = any, F = Field<any>> = FieldProps<
  ValueType,
  F
> & {
  Label?: FC<FieldLabelInternalProps>
  label?: string
  name?: string
}

export type FieldPropsInternal<ValueType = any, F = Field<any>> = FieldProps<
  ValueType,
  F
> & {
  Label: FC<FieldLabelInternalProps>
  label?: string
  id: string
  name?: string
}

function AutoFieldInternal<
  ValueType = any,
  FieldType extends Field<ValueType> = Field<ValueType>,
>(
  props: FieldPropsInternalOptional<ValueType, FieldType> & {
    Label?: FC<FieldLabelInternalProps>
  },
) {
  const { overrides } = useAppContext()

  const { field, label = field.label, id, Label = FieldLabelInternal } = props

  const defaultId = useSafeId()
  const resolvedId = id || defaultId

  const defaultFields = {
    array: ArrayField,
    external: ExternalField,
    object: ObjectField,
    select: SelectField,
    textarea: TextareaField,
    color: ColorField,
    richtext: RichTextField,
    spacing: SpacingField,
    align: AlignField,
    tailwindcss: TailwindCSSField,
    radio: RadioField,
    text: DefaultField,
    number: DefaultField,
  }

  const render = {
    ...overrides.fieldTypes,
    array: overrides.fieldTypes?.array || defaultFields.array,
    external: overrides.fieldTypes?.external || defaultFields.external,
    object: overrides.fieldTypes?.object || defaultFields.object,
    select: overrides.fieldTypes?.select || defaultFields.select,
    textarea: overrides.fieldTypes?.textarea || defaultFields.textarea,
    color: overrides.fieldTypes?.color || defaultFields.color,
    richtext: overrides.fieldTypes?.richtext || defaultFields.richtext,
    spacing: overrides.fieldTypes?.spacing || defaultFields.spacing,
    tailwindcss: overrides.fieldTypes?.tailwindcss || defaultFields.tailwindcss,
    align: overrides.fieldTypes?.align || defaultFields.align,
    radio: overrides.fieldTypes?.radio || defaultFields.radio,
    text: overrides.fieldTypes?.text || defaultFields.text,
    number: overrides.fieldTypes?.number || defaultFields.number,
  }

  const mergedProps = {
    ...props,
    field,
    label,
    Label,
    id: resolvedId,
  }

  if (field.type === 'custom') {
    if (!field.render) {
      return null
    }

    const CustomField = field.render as any

    return <CustomField {...mergedProps} />
  }

  const children = defaultFields[field.type](mergedProps)

  const Render = render[field.type] as (props: FieldProps) => ReactElement

  return <Render {...mergedProps}>{children}</Render>
}

export function AutoFieldPrivate<
  ValueType = any,
  FieldType extends Field<ValueType> = Field<ValueType>,
>(
  props: FieldPropsInternalOptional<ValueType, FieldType> & {
    Label?: FC<FieldLabelInternalProps>
  },
) {
  const { value, onChange } = props

  const [localValue, setLocalValue] = useState(value)

  const onChangeDb = useDebouncedCallback(
    (val, ui) => {
      onChange(val, ui)
    },
    50,
    { leading: true },
  )

  const onChangeLocal = useCallback((val: any, ui?: Partial<UiState>) => {
    setLocalValue(val)
    onChangeDb(val, ui)
  }, [])

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const localProps = {
    value: localValue,
    onChange: onChangeLocal,
  }

  return <AutoFieldInternal<ValueType, FieldType> {...props} {...localProps} />
}

const DefaultLabel = (props: any) => <div {...props} />

export function AutoField<
  ValueType = any,
  FieldType extends Field<ValueType> = Field<ValueType>,
>(props: FieldProps<ValueType, FieldType>) {
  return (
    <AutoFieldInternal<ValueType, FieldType> {...props} Label={DefaultLabel} />
  )
}

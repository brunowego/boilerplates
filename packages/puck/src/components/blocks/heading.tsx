import type { ComponentConfig } from '@measured/puck'

import _Heading, {
  type HeadingProps as _HeadingProps,
} from '@acme/ui/components/heading'

export type HeadingProps = {
  text?: string
  padding?: string
  align: 'text-left' | 'text-center' | 'text-right'
  level?: _HeadingProps['rank']
  size: _HeadingProps['size']
}

const sizeOptions = [
  { value: 'text-9xl', label: '9XL' },
  { value: 'text-8xl', label: '8XL' },
  { value: 'text-7xl', label: '7XL' },
  { value: 'text-6xl', label: '6XL' },
  { value: 'text-5xl', label: '5XL' },
  { value: 'text-4xl', label: '4XL' },
  { value: 'text-3xl', label: '3XL' },
  { value: 'text-2xl', label: '2XL' },
  { value: 'text-xl', label: 'XL' },
  { value: 'text-lg', label: 'LG' },
  { value: 'text-base', label: 'Base' },
  { value: 'text-sm', label: 'SM' },
  { value: 'text-xs', label: 'XS' },
]

const levelOptions = [
  { label: '', value: '' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
]

export const Heading: ComponentConfig<HeadingProps> = {
  fields: {
    text: { type: 'text' },
    padding: { type: 'text' },
    align: {
      type: 'radio',
      options: [
        { label: 'Left', value: 'text-left' },
        { label: 'Center', value: 'text-center' },
        { label: 'Right', value: 'text-right' },
      ],
    },
    level: {
      type: 'select',
      options: levelOptions,
    },
    size: {
      type: 'select',
      options: sizeOptions,
    },
  },
  defaultProps: {
    padding: '24px',
    align: 'text-left',
    size: 'text-base',
    text: 'Heading',
  },
  render: ({ padding, align, level, size, text }) => {
    return (
      <_Heading align={align} rank={level} size={size} style={{ padding }}>
        {text}
      </_Heading>
    )
  },
}

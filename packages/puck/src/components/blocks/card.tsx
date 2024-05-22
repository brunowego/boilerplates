import type { ComponentConfig } from '@measured/puck'
import type { ElementType } from 'react'

import Icon from '@acme/ui/components/icon'

import {
  Card as _Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@acme/ui/components/card'

const iconOptions = Object.keys(Icon).map((iconName) => ({
  label: iconName,
  value: iconName,
}))

export type CardProps = {
  title: string
  description: string
  icon: keyof typeof Icon
  mode: 'flat' | 'card'
}

export const Card: ComponentConfig<CardProps> = {
  fields: {
    title: { type: 'text' },
    description: { type: 'textarea' },
    icon: {
      type: 'select',
      options: iconOptions,
    },
    mode: {
      type: 'radio',
      options: [
        { label: 'card', value: 'card' },
        { label: 'flat', value: 'flat' },
      ],
    },
  },
  defaultProps: {
    title: 'Title',
    description: 'Description',
    icon: 'Feather',
    mode: 'flat',
  },
  render: ({ icon, title, description, mode }) => {
    const El: ElementType = Icon[icon] as ElementType

    return (
      <_Card mode={mode}>
        <CardHeader>
          <El className='mb-4 size-6' />

          <CardTitle>{title}</CardTitle>

          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </_Card>
    )
  },
}

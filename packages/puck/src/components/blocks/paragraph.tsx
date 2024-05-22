import type { ComponentConfig } from '@measured/puck'

import cn from '@acme/ui/lib/cn'

export type ParagraphProps = {
  align: 'text-left' | 'text-center' | 'text-right'
  text?: string
  padding?: string
  size?: 'text-sm' | 'text-base'
  color: 'text-foreground' | 'text-muted-foreground'
  maxWidth?: string
}

export const Paragraph: ComponentConfig<ParagraphProps> = {
  fields: {
    text: { type: 'textarea' },
    size: {
      type: 'select',
      options: [
        { label: 'Small', value: 'text-sm' },
        { label: 'Base', value: 'text-base' },
      ],
    },
    align: {
      type: 'radio',
      options: [
        { label: 'Left', value: 'text-left' },
        { label: 'Center', value: 'text-center' },
        { label: 'Right', value: 'text-right' },
      ],
    },
    color: {
      type: 'radio',
      options: [
        { label: 'Default', value: 'text-foreground' },
        { label: 'Muted', value: 'text-muted-foreground' },
      ],
    },
    padding: { type: 'text' },
    maxWidth: { type: 'text' },
  },
  defaultProps: {
    align: 'text-left',
    text: 'Text',
    padding: '24px',
    size: 'text-base',
    color: 'text-foreground',
  },
  render: ({ align, color, text, size, padding, maxWidth }) => {
    return (
      <p className={cn(align, color, size)} style={{ padding, maxWidth }}>
        {text}
      </p>
    )
  },
}

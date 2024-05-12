import type { ComponentConfig } from '@measured/puck'
import Link from 'next/link'

import cn from '@acme/ui/lib/cn'
import { buttonVariants } from '@acme/ui/components/button'

export type ButtonGroupProps = {
  align?: string
  buttons: {
    label: string
    href: string
    variant: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
  }[]
}

export const ButtonGroup: ComponentConfig<ButtonGroupProps> = {
  label: 'Button Group',
  fields: {
    buttons: {
      type: 'array',
      getItemSummary: (item) => item.label || 'Button',
      arrayFields: {
        label: { type: 'text' },
        href: { type: 'text' },
        variant: {
          type: 'radio',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Ghost', value: 'ghost' },
            { label: 'Link', value: 'link' },
          ],
        },
      },
      defaultItemProps: {
        label: 'Button',
        href: '#',
        variant: 'default',
      },
    },
    align: {
      type: 'radio',
      options: [
        { label: 'left', value: 'text-left' },
        { label: 'center', value: 'text-center' },
      ],
    },
  },
  defaultProps: {
    buttons: [{ label: 'Learn more', href: '#', variant: 'default' }],
  },
  render: ({ align, buttons }) => {
    return (
      <div className={cn('flex gap-x-2', align)}>
        {buttons.map((button, index) => (
          <Link
            className={buttonVariants({ variant: button.variant })}
            href={button.href}
            // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list of buttons
            key={index}
          >
            {button.label}
          </Link>
        ))}
      </div>
    )
  },
}

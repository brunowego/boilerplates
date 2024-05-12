import type { ComponentConfig } from '@measured/puck'
import { useState } from 'react'
import Link from 'next/link'

import cn from '@acme/ui/lib/cn'
import { buttonVariants } from '@acme/ui/components/button'

export type HeroProps = {
  title: string
  description: string
  align?: string
  padding: string
  image?: {
    mode?: 'inline' | 'background'
    url?: string
  }
  buttons: {
    label: string
    href: string
    variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link'
    more?: { text: string }[]
  }[]
}

export const Hero: ComponentConfig<HeroProps> = {
  fields: {
    title: { type: 'text' },
    description: { type: 'textarea' },
    buttons: {
      type: 'array',
      min: 1,
      max: 4,
      getItemSummary: (item) => item.label || 'Button',
      arrayFields: {
        label: { type: 'text' },
        href: { type: 'text' },
        variant: {
          type: 'select',
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
      },
    },
    align: {
      type: 'radio',
      options: [
        { label: 'left', value: 'left' },
        { label: 'center', value: 'center' },
      ],
    },
    image: {
      type: 'object',
      objectFields: {
        url: { type: 'text' },
        mode: {
          type: 'radio',
          options: [
            { label: 'inline', value: 'inline' },
            { label: 'background', value: 'background' },
          ],
        },
      },
    },
    padding: { type: 'text' },
  },
  defaultProps: {
    title: 'Hero',
    align: 'left',
    description: 'Description',
    buttons: [{ label: 'Learn more', href: '#' }],
    padding: '64px',
  },
  // resolveFields: async (data, { fields }) => {
  //   if (data.props.align === 'center') {
  //     return {
  //       ...fields,
  //       image: undefined,
  //     }
  //   }

  //   return fields
  // },
  render: ({ align, title, description, buttons, padding, image }) => {
    const [_] = useState(0)

    return (
      <div
        className={cn(
          'relative grid items-center',
          align === 'left' ? 'grid-cols-2' : 'justify-center text-center',
          image?.mode === 'background' && 'h-96',
        )}
        style={{ padding }}
      >
        <div className='z-10'>
          <h1 className='font-medium text-4xl'>{title}</h1>

          <p className='mt-2 text-lg text-muted-foreground'>{description}</p>

          <div className='mt-4 flex gap-x-2'>
            {buttons.map((button, index) => (
              <Link
                className={buttonVariants({ variant: button.variant })}
                href={button.href}
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
              >
                {button.label}
              </Link>
            ))}
          </div>
        </div>

        {align !== 'center' && image?.mode !== 'background' && image?.url && (
          <div
            className='ml-auto w-full rounded-lg bg-center bg-cover bg-no-repeat'
            style={{
              backgroundImage: `url('${image?.url}')`,
              height: 356,
            }}
          />
        )}

        {image?.mode === 'background' && (
          <>
            <div
              className='absolute inset-0 h-full w-full bg-center bg-cover bg-no-repeat'
              style={{
                backgroundImage: `url("${image?.url}")`,
              }}
            />

            <div
              className={cn(
                'absolute inset-0 h-full w-full',
                align === 'left'
                  ? 'bg-gradient-to-r from-background to-transparent'
                  : 'bg-background/70',
              )}
            />
          </>
        )}
      </div>
    )
  },
}

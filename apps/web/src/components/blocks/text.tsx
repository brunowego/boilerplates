import type { ComponentConfig } from '@acme/puck'
import cn from '@acme/ui/utils/cn'

const alignOptions = [
  {
    label: 'Left',
    value: 'text-left',
  },
  {
    label: 'Center',
    value: 'text-center',
  },
  {
    label: 'Right',
    value: 'text-right',
  },
]

type TextProps = {
  align?: (typeof alignOptions)[number]['value']
  text: string
  className?: string
}

export const Text: ComponentConfig<TextProps> = {
  icon: 'Pilcrow',
  fields: {
    align: {
      label: 'Alignment',
      type: 'radio',
      options: alignOptions,
    },
    text: { label: 'Text', type: 'richtext' },
    className: {
      label: 'Tailwind CSS',
      type: 'tailwindcss',
    },
  },
  defaultProps: {
    text: 'Text',
  },
  render: ({ align, text, className }) => {
    return (
      <div
        className={cn(align, className)}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is a rich text editor
        dangerouslySetInnerHTML={{ __html: text as string }}
      />
    )
  },
}

import type { ComponentConfig } from '@acme/puck'
import Link from 'next/link'

import { buttonVariants } from '@acme/ui/components/button'

type ButtonProps = {
  text: string
  className?: string
}

export const Button: ComponentConfig<ButtonProps> = {
  icon: 'SquareMinus',
  fields: {
    text: { label: 'Text', type: 'richtext' },
    className: { label: 'Tailwind CSS', type: 'tailwindcss' },
  },
  defaultProps: {
    text: 'Text',
  },
  render: ({ text, className }) => {
    return (
      <Link
        className={buttonVariants({ className })}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is a trusted source
        dangerouslySetInnerHTML={{ __html: text }}
        href='/'
      />
    )
  },
}

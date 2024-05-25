import type { ComponentConfig } from '@acme/puck'

type TitleProps = {
  text?: string
}

export const Title: ComponentConfig<TitleProps> = {
  icon: 'Type',
  fields: {
    text: { type: 'textarea' },
  },
  defaultProps: {
    text: 'Title',
  },
  render: ({ text }) => {
    return <h1>{text}</h1>
  },
}

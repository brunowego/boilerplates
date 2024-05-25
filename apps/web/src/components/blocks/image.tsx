import type { ComponentConfig } from '@acme/puck'

type ImageProps = {
  classNames?: string
}

export const Image: ComponentConfig<ImageProps> = {
  icon: 'Image',
  fields: {
    classNames: {
      label: 'Tailwind CSS',
      type: 'tailwindcss',
    },
  },
  render: ({ classNames }) => {
    return (
      <img
        alt=''
        className={classNames}
        src='http://localhost:13000/static/img/logo.webp'
      />
    )
  },
}

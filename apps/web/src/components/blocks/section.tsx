import { type ComponentConfig, DropZone } from '@acme/puck'
import cn from '@acme/ui/utils/cn'

type Margin = {
  marginTop: number
  marginRight: number
  marginBottom: number
  marginLeft: number
}

type Padding = {
  paddingTop: number
  paddingRight: number
  paddingBottom: number
  paddingLeft: number
}

type Spacing = {
  margin: Margin
  padding: Padding
}

type SectionProps = {
  spacing: Spacing
  backgroundColor: string
  backgroundImage: string
  color: string
  className?: string
}

export const Section: ComponentConfig<SectionProps> = {
  icon: 'GalleryVertical',
  fields: {
    spacing: {
      label: 'Spacing',
      type: 'spacing',
    },
    backgroundImage: {
      label: 'Background Image',
      type: 'text',
    },
    backgroundColor: {
      label: 'Background Color',
      type: 'color',
    },
    color: {
      label: 'Foreground',
      type: 'color',
    },
    className: {
      label: 'Tailwind CSS',
      type: 'tailwindcss',
    },
  },
  render: ({ backgroundColor, backgroundImage, color, className }) => {
    return (
      <section
        className={className}
        style={{
          backgroundColor,
          ...(backgroundImage && {
            backgroundImage: `url(${backgroundImage})`,
          }),
          color,
        }}
      >
        <div className='container'>
          <DropZone zone='section' />
        </div>
      </section>
    )
  },
}

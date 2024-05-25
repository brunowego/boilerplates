import { type ComponentConfig, DropZone } from '@acme/puck'

export const Box: ComponentConfig = {
  icon: 'Square',
  render: () => {
    return (
      <div>
        <DropZone zone='box' />
      </div>
    )
  },
}

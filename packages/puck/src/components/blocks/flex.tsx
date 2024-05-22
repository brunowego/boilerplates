import { type ComponentConfig, DropZone } from '@measured/puck'

export type FlexProps = {
  items: { minItemWidth?: number }[]
  minItemWidth: number
}

export const Flex: ComponentConfig<FlexProps> = {
  fields: {
    items: {
      type: 'array',
      arrayFields: {
        minItemWidth: {
          label: 'Minimum Item Width',
          type: 'number',
          min: 0,
        },
      },
      getItemSummary: (_, id) => `Item ${(id as number) + 1}`,
    },
    minItemWidth: {
      label: 'Minimum Item Width',
      type: 'number',
      min: 0,
    },
  },
  defaultProps: {
    items: [{}, {}],
    minItemWidth: 317,
  },
  render: ({ items, minItemWidth }) => {
    return (
      <div className='flex flex-wrap gap-4 px-4 lg:px-5'>
        {items.map((item, idx) => (
          <div
            className='flex-1'
            // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list of items
            key={idx}
            style={{ minWidth: item.minItemWidth || minItemWidth }}
          >
            <DropZone zone={`item-${idx}`} />
          </div>
        ))}
      </div>
    )
  },
}

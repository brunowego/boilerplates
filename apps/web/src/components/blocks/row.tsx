import { type ComponentConfig, DropZone } from '@acme/puck'

export type RowProps = {
  rows: {}[]
}

export const Row: ComponentConfig<RowProps> = {
  icon: 'Rows2',
  fields: {
    rows: {
      label: 'Rows',
      type: 'array',
      getItemSummary: (_, id) => `Row ${(id as number) + 1}`,
      arrayFields: {},
    },
  },
  defaultProps: {
    rows: [{}, {}],
  },
  render: ({ rows }) => {
    return (
      <div className='grid px-4'>
        {rows.map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
          <DropZone key={index} zone={`row-${index}`} />
        ))}
      </div>
    )
  },
}

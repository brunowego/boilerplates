import { type ComponentConfig, DropZone } from '@measured/puck'

import cn from '@acme/ui/lib/cn'

export type ColumnsProps = {
  distribution: 'auto' | 'manual'
  columns: {
    span?: number
  }[]
}

export const Columns: ComponentConfig<ColumnsProps> = {
  fields: {
    distribution: {
      type: 'radio',
      options: [
        {
          value: 'auto',
          label: 'Auto',
        },
        {
          value: 'manual',
          label: 'Manual',
        },
      ],
    },
    columns: {
      type: 'array',
      getItemSummary: (col, id) =>
        `Column ${(id as number) + 1}, span ${
          col.span ? Math.max(Math.min(col.span, 12), 1) : 'auto'
        }`,
      arrayFields: {
        span: {
          label: 'Span (1-12)',
          type: 'number',
          min: 0,
          max: 12,
        },
      },
    },
  },
  defaultProps: {
    distribution: 'auto',
    columns: [{}, {}],
  },
  render: ({ columns, distribution }) => {
    return (
      <div
        className={cn(
          'grid gap-x-4 px-4 lg:px-5',
          distribution === 'manual'
            ? 'grid-cols-12'
            : `grid-cols-${Math.max(Math.min(columns.length, 12), 1)}`,
        )}
      >
        {columns.map(({ span }, index) => (
          <div
            {...(span &&
              distribution === 'manual' && {
                className: `col-span-${Math.max(Math.min(span, 12), 1)}`,
              })}
            // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list of columns
            key={index}
          >
            <DropZone zone={`column-${index}`} />
          </div>
        ))}
      </div>
    )
  },
}

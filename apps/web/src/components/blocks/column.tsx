import { type ComponentConfig, DropZone } from '@acme/puck'

import cn from '@acme/ui/utils/cn'

export type ColumnProps = {
  distribution: 'auto' | 'manual'
  columns: {
    span?: number
  }[]
  classNames?: string
}

export const Column: ComponentConfig<ColumnProps> = {
  icon: 'Columns2',
  fields: {
    distribution: {
      label: 'Distribution',
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
      label: 'Columns',
      type: 'array',
      getItemSummary: (col, id) =>
        `Column ${(id as number) + 1}, span ${
          col.span ? Math.max(Math.min(col.span, 12), 1) : 'auto'
        }`,
      arrayFields: {
        span: {
          label: 'Span (1-12)',
          type: 'number',
          min: 1,
          max: 12,
        },
      },
    },
    classNames: {
      label: 'Tailwind CSS',
      type: 'tailwindcss',
    },
  },
  defaultProps: {
    distribution: 'auto',
    columns: [{}, {}],
  },
  render: ({ columns, distribution, classNames }) => {
    return (
      <div
        className={cn(
          'grid gap-x-4 px-4',
          distribution === 'manual'
            ? 'grid-cols-12'
            : `grid-cols-${Math.max(Math.min(columns.length, 12), 1)}`,
          classNames,
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

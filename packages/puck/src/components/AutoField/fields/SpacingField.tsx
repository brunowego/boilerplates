import { AlignHorizontalSpaceAround } from '@acme/ui/components/icon'

import type { FieldPropsInternal } from '../'

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

export const SpacingField = ({
  onChange,
  readOnly,
  value,
  name,
  label,
  Label,
  id,
}: FieldPropsInternal) => {
  return (
    <Label
      icon={<AlignHorizontalSpaceAround className='size-4' />}
      label={label || name}
      readOnly={readOnly}
    >
      {/* <textarea
        id={id}
        name={name}
        onChange={(e) => onChange(e.currentTarget.value)}
        readOnly={readOnly}
        tabIndex={readOnly ? -1 : undefined}
        value={typeof value === 'undefined' ? '' : value}
      /> */}

      <div className='relative flex items-center rounded-lg border-2 border-dashed px-12 py-10'>
        <span className='absolute top-2 left-2 text-[10px] text-muted-foreground uppercase'>
          margin
        </span>

        <span className='absolute top-12 left-14 text-[10px] text-muted-foreground uppercase'>
          padding
        </span>

        <div className='relative w-full'>
          <div className='-translate-y-1/2 absolute inset-x-0 top-0 flex flex-col items-center gap-2'>
            <input
              className='size-4 bg-transparent text-center text-sm outline-none'
              defaultValue={0}
              type='text'
            />

            <div className='size-2 border-2 border-blue-600 bg-background' />

            <input
              className='size-4 bg-transparent text-center text-sm outline-none'
              defaultValue={0}
              type='text'
            />
          </div>

          <div className='absolute inset-y-0 right-0 flex translate-x-1/2 items-center gap-2'>
            <input
              className='size-4 bg-transparent text-center text-sm outline-none'
              defaultValue={0}
              type='text'
            />

            <div className='size-2 border-2 border-blue-600 bg-background' />

            <input
              className='size-4 bg-transparent text-center text-sm outline-none'
              defaultValue={0}
              type='text'
            />
          </div>

          <div className='absolute inset-x-0 bottom-0 flex translate-y-1/2 flex-col items-center gap-2'>
            <input
              className='size-4 bg-transparent text-center text-sm outline-none'
              defaultValue={0}
              type='text'
            />

            <div className='size-2 border-2 border-blue-600 bg-background' />

            <input
              className='size-4 bg-transparent text-center text-sm outline-none'
              defaultValue={0}
              type='text'
            />
          </div>

          <div className='-translate-x-1/2 absolute inset-y-0 left-0 flex items-center gap-2'>
            <input
              className='size-4 bg-transparent text-center text-sm outline-none'
              defaultValue={0}
              type='text'
            />

            <div className='size-2 border-2 border-blue-600 bg-background' />

            <input
              className='size-4 bg-transparent text-center text-sm outline-none'
              defaultValue={0}
              type='text'
            />
          </div>

          <div className='h-24 w-full rounded-lg border-2 border-blue-600 px-10 py-8'>
            <div className='h-full w-full rounded-md bg-border' />
          </div>
        </div>
      </div>
    </Label>
  )
}

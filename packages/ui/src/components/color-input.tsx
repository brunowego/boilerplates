import { type JSX, useState, useCallback } from 'react'
import { useDebounce } from '@uidotdev/usehooks'

import Popover from '@acme/ui/components/popover'
import Input from '@acme/ui/components/input'

import cn from '../utils/cn'
import ColorPicker from './color-picker'

type ColorInputProps = {
  id?: string
  name?: string
  readOnly?: boolean
  tabIndex?: number
  value: string
  onChange: (value: string) => void
  className?: string
}

export default function ColorInput({
  id,
  name,
  value,
  readOnly,
  tabIndex,
  onChange,
  className,
}: ColorInputProps): JSX.Element {
  const [open, setOpen] = useState(false)
  const [hex, setHex] = useState<string>(value)
  const debouncedOpen = useDebounce(open, 300)

  const handleMouseEnter = () => setOpen(true)
  const handleMouseLeave = () => setOpen(false)

  const handleInputChange = useCallback((color: string) => {
    setHex(color)
    onChange(color)
  }, [])

  return (
    <Popover open={debouncedOpen} onOpenChange={setOpen}>
      <Popover.Trigger
        asChild
        onClick={(e) => e.preventDefault()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={cn('relative', className)}>
          <div
            className='absolute inset-1.5 size-7 rounded-[2px] bg-border'
            style={{ backgroundColor: hex }}
          />

          <Input
            className='pl-10'
            defaultValue={value}
            id={id}
            name={name}
            onChange={(e) => handleInputChange(e.currentTarget.value)}
            readOnly={readOnly}
            tabIndex={tabIndex}
            value={hex}
          />
        </div>
      </Popover.Trigger>

      <Popover.Content
        align='start'
        className='w-auto p-0'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ColorPicker
          color={hex}
          disableAlpha={true}
          onChange={(color) => handleInputChange(color.hex)}
        />
      </Popover.Content>
    </Popover>
  )
}

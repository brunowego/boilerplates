import { observer, useReka } from '@rekajs/react'
import type { Frame } from '@rekajs/core'
import { useState } from 'react'

import { RenderFrame } from './renderer'

const Preview = observer(() => {
  const { reka } = useReka()
  // @ts-ignore
  const [selectedFrame, setSelectedFrame] = useState<Frame>(reka.frames[0])

  return (
    <div className='flex h-full w-full flex-col text-xs'>
      <div className='border-b-2 px-2 py-3'>
        <select
          onChange={(e) => {
            const frameId = e.target.value
            const frame = reka.frames.find((frame) => frame.id === frameId)

            if (!frame) {
              return
            }

            setSelectedFrame(frame)
          }}
        >
          {reka.frames.map((frame) => (
            <option key={frame.id} value={frame.id}>
              {frame.id}
            </option>
          ))}
        </select>
      </div>

      <div className='flex-1 px-2 py-2'>
        {selectedFrame ? (
          <RenderFrame frame={selectedFrame} />
        ) : (
          <div className='px-3 py-4'>No frame selected</div>
        )}
      </div>
    </div>
  )
})

export default Preview

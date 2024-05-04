import { useReka } from '@rekajs/react'
import { useState } from 'react'
import { Parser } from '@rekajs/parser'
import { CodeEditor } from '@rekajs/react-code-editor'
import * as t from '@rekajs/types'

export default function Editor() {
  const { reka } = useReka()
  const [newTextValue, setNewTextValue] = useState('')

  return (
    <div className='h-full w-full'>
      <div className='flex gap-2 border-b-2 bg-gray-100 px-3 py-2'>
        <input
          className='flex-1 px-2 py-1 text-xs'
          onChange={(e) => setNewTextValue(e.target.value)}
          placeholder='New value'
          type='text'
          value={newTextValue}
        />

        <button
          className='rounded bg-blue-200 px-2 py-1 text-blue-600 text-xs disabled:opacity-25'
          disabled={!newTextValue}
          onClick={() => {
            if (!newTextValue) {
              return
            }

            try {
              const parsedTextValue = Parser.parseExpression(newTextValue)
              const appComponent = reka.state.program.components.find(
                (component) => component.name === 'App',
              )

              if (!appComponent) {
                return
              }

              reka.change(() => {
                // @ts-ignore
                appComponent.template.children.push(
                  t.tagTemplate({
                    tag: 'text',
                    props: {
                      value: parsedTextValue,
                    },
                    children: [],
                  }),
                )
              })
            } catch (err) {
              console.warn(err)
            }
          }}
          type='button'
        >
          Add text
        </button>
      </div>

      <CodeEditor className='h-full w-full text-sm' />
    </div>
  )
}

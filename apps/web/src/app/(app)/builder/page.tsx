'use client'

import type { JSX } from 'react'
import { Reka } from '@rekajs/core'
import { RekaProvider } from '@rekajs/react'
import * as t from '@rekajs/types'

// import Editor from '@/components/editor'
import Preview from '@/components/preview'

export default function BuilderPage(): JSX.Element {
  const reka = Reka.create()

  reka.load(
    t.state({
      extensions: {},
      program: t.program({
        globals: [
          t.val({
            name: 'globalText',
            init: t.literal({ value: 'Global Text!' }),
          }),
        ],
        components: [
          t.rekaComponent({
            name: 'App',
            props: [],
            state: [],
            template: t.tagTemplate({
              tag: 'div',
              props: {
                className: t.literal({
                  value: 'px-3 py-4 w-full h-full',
                }),
              },
              children: [
                t.tagTemplate({
                  tag: 'h4',
                  props: {
                    className: t.literal({ value: 'text-lg w-full' }),
                  },
                  children: [
                    t.tagTemplate({
                      tag: 'text',
                      props: {
                        value: t.literal({ value: 'Hello World' }),
                      },
                      children: [],
                    }),
                  ],
                }),

                t.componentTemplate({
                  component: t.identifier({ name: 'Button' }),
                  props: {},
                  children: [],
                }),
              ],
            }),
          }),
          t.rekaComponent({
            name: 'Button',
            props: [
              t.componentProp({
                name: 'text',
                init: t.literal({ value: 'Click me!' }),
              }),
            ],
            state: [t.val({ name: 'counter', init: t.literal({ value: 0 }) })],
            template: t.tagTemplate({
              tag: 'button',
              props: {
                className: t.literal({ value: 'rounded border-2 px-3 py-2' }),
                onClick: t.func({
                  params: [],
                  body: t.block({
                    statements: [
                      t.assignment({
                        left: t.identifier({ name: 'counter' }),
                        operator: '+=',
                        right: t.literal({ value: 1 }),
                      }),
                    ],
                  }),
                }),
              },
              children: [
                t.tagTemplate({
                  tag: 'text',
                  props: {
                    value: t.identifier({ name: 'text' }),
                  },
                  children: [],
                }),
                t.tagTemplate({
                  tag: 'text',
                  props: {
                    value: t.binaryExpression({
                      left: t.literal({ value: ' -> ' }),
                      operator: '+',
                      right: t.identifier({ name: 'counter' }),
                    }),
                  },
                  children: [],
                }),
              ],
            }),
          }),
        ],
      }),
    }),
  )

  reka.createFrame({
    id: 'Main app',
    component: {
      name: 'App',
    },
    evaluateImmediately: true,
  })

  reka.createFrame({
    id: 'Primary button',
    component: {
      name: 'Button',
      props: {
        text: t.literal({ value: 'Primary button' }),
      },
    },
    evaluateImmediately: true,
  })

  return (
    <RekaProvider reka={reka}>
      <div className='flex h-screen'>
        {/* <div className='h-full w-3/6 border-r-2'>
          <Editor />
        </div> */}

        <div className='flex-1'>
          <Preview />
        </div>
      </div>
    </RekaProvider>
  )
}

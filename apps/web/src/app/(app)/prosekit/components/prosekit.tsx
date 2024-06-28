'use client'

// import type { NodeJSON } from 'prosekit/core'
import { type JSX, useState } from 'react'
import ContentEditable from 'react-contenteditable'

import RichEditor from '@/components/rich-editor'

// const defaultDoc: NodeJSON = {
//   type: 'doc',
//   content: [
//     {
//       type: 'heading',
//       attrs: {
//         level: 1,
//       },
//       content: [
//         {
//           type: 'text',
//           text: 'Drag the images below to see the custom drop cursor',
//         },
//       ],
//     },
//     {
//       type: 'paragraph',
//       content: [
//         {
//           type: 'text',
//           text: 'Drag the images below to see the custom drop cursor.',
//         },
//       ],
//     },
//   ],
// }

export default function ProseKit(): JSX.Element {
  const [title, setTitle] = useState('')

  return (
    <div className='space-y-4'>
      <ContentEditable
        className='font-semibold text-5xl outline-none before:pointer-events-none before:absolute before:h-0 before:opacity-30 before:empty:content-["Untitled"]'
        disabled={false}
        html={title}
        onChange={(e) => {
          if (e.target.value.trim().length === 0) {
            return
          }

          setTitle(e.target.value)
        }}
        tagName='h1'
      />

      <RichEditor
      // defaultDoc={defaultDoc}
      />
    </div>
  )
}

import type { NodeJSON } from 'prosekit/core'
import type { JSX } from 'react'

import RichEditor from '@/components/rich-editor'

const defaultDoc: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Drag the images below to see the custom drop cursor.',
        },
      ],
    },
  ],
}

export default function ProseKit(): JSX.Element {
  return <RichEditor defaultDoc={defaultDoc} />
}

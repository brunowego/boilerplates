'use client'

import { type JSX, useMemo, useCallback } from 'react'
import 'prosekit/basic/style.css'

import { type NodeJSON, createEditor, jsonFromNode } from 'prosekit/core'
import type { ProseMirrorNode } from 'prosekit/pm/model'
import { useDocChange, ProseKit } from 'prosekit/react'

import { defineEditorExtension } from './editor-extension'
import EditorInlineMenu from './editor-inline-menu'
import EditorSlashMenu from './editor-slash-menu'
// import { BlockPopover, BlockDragHandle } from 'prosekit/react/block-handle'

export default function RichEditor(props: {
  defaultDoc?: NodeJSON
  onDocUpdate?: (doc: NodeJSON) => void
}): JSX.Element {
  const editor = useMemo(() => {
    const extension = defineEditorExtension()

    return createEditor({ extension, defaultDoc: props.defaultDoc })
  }, [])

  const handleDocChange = useCallback(
    (doc: ProseMirrorNode) => props.onDocUpdate?.(jsonFromNode(doc)),
    [props.onDocUpdate],
  )

  useDocChange(handleDocChange, { editor })

  return (
    <ProseKit editor={editor}>
      <div
        className='prose dark:prose-invert mx-auto min-h-full px-10 outline-none'
        ref={editor.mount}
      />

      {/* <BlockPopover>
        <BlockDragHandle />
      </BlockPopover> */}

      <EditorInlineMenu />
      <EditorSlashMenu />
    </ProseKit>
  )
}

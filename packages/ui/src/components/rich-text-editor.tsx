'use client'

import { type Editor, useEditor, EditorContent } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import type { JSX } from 'react'
import StarterKit from '@tiptap/starter-kit'

import Toggle from './toggle'
import { Bold, Strikethrough, Italic, List, ListOrdered } from './icon'
import Separator from './separator'
import Skeleton from './skeleton'

type RichTextEditorToolbarProps = {
  editor: Editor
}

const RichTextEditorToolbar = ({
  editor,
}: RichTextEditorToolbarProps): JSX.Element => {
  return (
    <div className='flex h-12 items-center gap-1.5 rounded-b border border-input px-2'>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        pressed={editor.isActive('bold')}
        size='sm'
      >
        <Bold className='size-4' />
      </Toggle>

      <Toggle
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        pressed={editor.isActive('italic')}
        size='sm'
      >
        <Italic className='size-4' />
      </Toggle>

      <Toggle
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        pressed={editor.isActive('strike')}
        size='sm'
      >
        <Strikethrough className='size-4' />
      </Toggle>

      <Separator orientation='vertical' className='h-8 w-[1px]' />

      <Toggle
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        pressed={editor.isActive('bulletList')}
        size='sm'
      >
        <List className='size-4' />
      </Toggle>

      <Toggle
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        pressed={editor.isActive('orderedList')}
        size='sm'
      >
        <ListOrdered className='size-4' />
      </Toggle>
    </div>
  )
}

type RichTextEditorProps = {
  placeholder?: string
  disabled?: boolean
  onBlur?: (html: string) => void
  onChange?: (html: string) => void
  value?: string
}

export default function RichTextEditor({
  placeholder = '',
  disabled = false,
  onBlur,
  onChange,
  value = '',
}: RichTextEditorProps): JSX.Element {
  const editor = useEditor(
    {
      content: value,
      extensions: [
        StarterKit.configure({
          bulletList: {
            HTMLAttributes: {
              class: 'list-disc pl-4',
            },
          },
          orderedList: {
            HTMLAttributes: {
              class: 'list-decimal pl-4',
            },
          },
        }),
        Placeholder.configure({
          placeholder,
        }),
      ],
      editable: !disabled,
      editorProps: {
        attributes: {
          class:
            'min-h-28 rounded-t-md border border-input border-b-0 p-4 text-sm leading-6 disabled:cursor-not-allowed placeholder:text-muted-foreground disabled:opacity-50 focus-visible:outline-none',
        },
      },
      onUpdate: ({ editor }) => {
        if (onChange) {
          onChange(editor.getHTML())
        }
      },
      onBlur: ({ editor }) => {
        if (onBlur) {
          onBlur(editor.getHTML())
        }
      },
    },
    [disabled],
  )

  if (!editor) {
    return <Skeleton className='h-40' />
  }

  return (
    <div className='flex flex-col'>
      <EditorContent editor={editor} />

      <RichTextEditorToolbar editor={editor} />
    </div>
  )
}

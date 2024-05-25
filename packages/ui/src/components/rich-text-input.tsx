'use client'

import { type Editor, useEditor, EditorContent } from '@tiptap/react'
import type { JSX } from 'react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import { useDebouncedCallback } from 'use-debounce'

import ToggleGroup from './toggle-group'
import {
  Bold,
  Strikethrough,
  Italic,
  Underline as UnderlineIcon,
  Baseline,
  Brush,
  ChevronDown,
  Eraser,
} from './icon'
import Skeleton from './skeleton'
import Toggle from './toggle'
import Popover from './popover'
import Button from './button'
import ColorPicker from './color-picker'

type RichTextInputToolbarProps = {
  editor: Editor
}

const RichTextInputToolbar = ({
  editor,
}: RichTextInputToolbarProps): JSX.Element => {
  const activeColor = editor.getAttributes('textStyle').color
  const activeHighlight = editor.getAttributes('highlight').color

  const handleColorChangeWithDebounce = useDebouncedCallback(
    (color: string) => {
      editor.chain().focus().setColor(color).run()
    },
    1000,
  )

  const handleHighlightChangeWithDebounce = useDebouncedCallback(
    (color: string) => {
      editor.chain().focus().toggleHighlight({ color }).run()
    },
    1000,
  )

  return (
    <div className='flex items-center gap-1.5 py-1.5'>
      <ToggleGroup
        type='multiple'
        value={[
          editor.isActive('bold') ? 'Bold' : '',
          editor.isActive('italic') ? 'Italic' : '',
          editor.isActive('strike') ? 'Strike' : '',
          editor.isActive('underline') ? 'Underline' : '',
        ]}
      >
        <ToggleGroup.Item
          aria-label='Toggle bold'
          onClick={() => editor.chain().focus().toggleBold().run()}
          size='sm'
          value='Bold'
        >
          <Bold className='size-4' />
        </ToggleGroup.Item>

        <ToggleGroup.Item
          aria-label='Toggle italic'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          size='sm'
          value='Italic'
        >
          <Italic className='size-4' />
        </ToggleGroup.Item>

        <ToggleGroup.Item
          aria-label='Toggle strikethrough'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          size='sm'
          value='Strike'
        >
          <Strikethrough className='size-4' />
        </ToggleGroup.Item>

        <ToggleGroup.Item
          aria-label='Toggle underline'
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          size='sm'
          value='Underline'
        >
          <UnderlineIcon className='size-4' />
        </ToggleGroup.Item>
      </ToggleGroup>

      <div className='flex'>
        <Toggle aria-label='Color' className='relative' size='sm'>
          <Baseline className='size-4 shrink-0' />

          <span
            className='absolute bottom-1 h-[2px] w-4 rounded-full'
            style={{ backgroundColor: activeColor }}
          />
        </Toggle>

        <Popover>
          <Popover.Trigger asChild>
            <Button
              className='!px-px text-muted-foreground'
              size='sm'
              variant='ghost'
            >
              <ChevronDown className='size-4' />
            </Button>
          </Popover.Trigger>

          <Popover.Content className='w-auto p-0'>
            <ColorPicker
              color={activeColor}
              disableAlpha
              onChange={(color) => handleColorChangeWithDebounce(color.hex)}
            />
          </Popover.Content>
        </Popover>
      </div>

      <div className='flex'>
        <Toggle aria-label='Color' className='relative' size='sm'>
          <Brush className='size-4 shrink-0' />

          <span
            className='absolute bottom-1 h-[2px] w-4 rounded-full'
            style={{ backgroundColor: activeHighlight }}
          />
        </Toggle>

        <Popover>
          <Popover.Trigger asChild>
            <Button
              className='!px-px text-muted-foreground'
              size='sm'
              variant='ghost'
            >
              <ChevronDown className='size-4' />
            </Button>
          </Popover.Trigger>

          <Popover.Content className='w-auto p-1'>
            <ColorPicker
              color={activeColor}
              disableAlpha
              onChange={(color) => handleHighlightChangeWithDebounce(color.hex)}
            />
          </Popover.Content>
        </Popover>
      </div>

      <Button
        aria-label='Eraser'
        className='!px-2'
        onClick={() =>
          editor.chain().focus().unsetColor().unsetHighlight().run()
        }
        size='sm'
        variant='ghost'
      >
        <Eraser className='size-4' />
      </Button>
    </div>
  )
}

type RichTextInputProps = {
  id?: string
  name?: string
  readOnly?: boolean
  tabIndex?: number
  disabled?: boolean
  onBlur?: (html: string) => void
  onChange?: (html: string) => void
  value?: string
}

export default function RichTextInput({
  id,
  name,
  readOnly,
  tabIndex,
  disabled = false,
  onBlur,
  onChange,
  value = '',
}: RichTextInputProps): JSX.Element {
  const editor = useEditor(
    {
      content: value,
      extensions: [
        StarterKit,

        Underline,
        TextStyle,
        Color.configure({
          types: ['textStyle'],
        }),
        Highlight.configure({
          multicolor: true,
        }),
      ],
      editable: !disabled,
      editorProps: {
        attributes: {
          class:
            'min-h-28 border p-4 text-sm rounded-md leading-6 disabled:cursor-not-allowed placeholder:text-muted-foreground disabled:opacity-50 focus-visible:outline-none',
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
    <>
      <EditorContent
        editor={editor}
        id={id}
        name={name}
        readOnly={readOnly}
        tabIndex={tabIndex}
      />

      <RichTextInputToolbar editor={editor} />
    </>
  )
}

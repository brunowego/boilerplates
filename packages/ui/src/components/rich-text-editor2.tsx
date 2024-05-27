'use client'

import { type Editor, useEditor, EditorContent } from '@tiptap/react'
import { type JSX, useState } from 'react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
// import Compact from '@uiw/react-color-compact'
import Sketch from '@uiw/react-color-sketch'
import { useDebounce } from '@uidotdev/usehooks'
import { useDebouncedCallback } from 'use-debounce'

import ToggleGroup from './toggle-group'
import {
  Bold,
  Strikethrough,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  AlignRight,
  Undo,
  Redo,
  Baseline,
  Brush,
  ChevronDown,
  Eraser,
} from './icon'
import Skeleton from './skeleton'
import Toggle from './toggle'
import Popover from './popover'
import Button from './button'

type RichTextEditorToolbarProps = {
  editor: Editor
}

const RichTextEditorToolbar = ({
  editor,
}: RichTextEditorToolbarProps): JSX.Element => {
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
    <div className='flex min-h-12 items-center gap-1.5 p-1.5'>
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

      <ToggleGroup
        type='multiple'
        value={[
          editor.isActive({ textAlign: 'left' }) ? 'Left' : '',
          editor.isActive({ textAlign: 'center' }) ? 'Center' : '',
          editor.isActive({ textAlign: 'justify' }) ? 'Justify' : '',
          editor.isActive({ textAlign: 'right' }) ? 'Right' : '',
        ]}
      >
        <ToggleGroup.Item
          aria-label='Align left'
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          size='sm'
          value='Left'
        >
          <AlignLeft className='size-4' />
        </ToggleGroup.Item>

        <ToggleGroup.Item
          aria-label='Align center'
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          size='sm'
          value='Center'
        >
          <AlignCenter className='size-4' />
        </ToggleGroup.Item>

        <ToggleGroup.Item
          aria-label='Align justify'
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          size='sm'
          value='Justify'
        >
          <AlignJustify className='size-4' />
        </ToggleGroup.Item>

        <ToggleGroup.Item
          aria-label='Align right'
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          size='sm'
          value='Right'
        >
          <AlignRight className='size-4' />
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
            {/* <Compact
              color={activeColor}
              onChange={(color) =>
                editor.chain().focus().setColor(color.hex).run()
              }
            /> */}

            <Sketch
              color={activeColor}
              disableAlpha
              // onChange={(color) => editor.chain().focus().setColor(color.hex)}
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
            {/* <Compact
              color={activeColor}
              onChange={(color) =>
                editor
                  .chain()
                  .focus()
                  .toggleHighlight({ color: color.hex })
                  .run()
              }
            /> */}

            <Sketch
              color={activeColor}
              disableAlpha
              // onChange={(color) =>
              //   editor
              //     .chain()
              //     .focus()
              //     .toggleHighlight({ color: color.hex })
              //     .run()
              // }
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

      <ToggleGroup
        className='ml-auto'
        type='multiple'
        value={[
          editor.isActive('undo') ? 'Undo' : '',
          editor.isActive('redo') ? 'Redo' : '',
        ]}
      >
        <ToggleGroup.Item
          aria-label='Undo'
          disabled={!editor.can().chain().focus().undo().run()}
          onClick={() => editor.chain().focus().undo().run()}
          size='sm'
          value='undo'
        >
          <Undo className='size-4' />
        </ToggleGroup.Item>

        <ToggleGroup.Item
          aria-label='Redo'
          disabled={!editor.can().chain().focus().redo().run()}
          onClick={() => editor.chain().focus().redo().run()}
          size='sm'
          value='redo'
        >
          <Redo className='size-4' />
        </ToggleGroup.Item>
      </ToggleGroup>
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

export default function RichTextEditor2({
  placeholder = '',
  disabled = false,
  onBlur,
  onChange,
  value = '',
}: RichTextEditorProps): JSX.Element {
  const [open, setOpen] = useState(false)
  const debouncedOpen = useDebounce(open, 200)

  const handleMouseEnter = () => {
    setOpen(true)
  }

  const handleMouseLeave = () => {
    setOpen(false)
  }

  const editor = useEditor(
    {
      content: value,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder,
        }),
        Underline,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
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
    <Popover open={debouncedOpen} onOpenChange={setOpen}>
      <Popover.Trigger
        asChild
        onClick={(e) => e.preventDefault()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <EditorContent editor={editor} />
      </Popover.Trigger>

      <Popover.Content
        align='start'
        className='w-auto p-0'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <RichTextEditorToolbar editor={editor} />
      </Popover.Content>
    </Popover>
  )
}

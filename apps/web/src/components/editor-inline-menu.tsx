import { type JSX, useState } from 'react'
import { useEditor } from 'prosekit/react'
import type { EditorState } from 'prosekit/pm/state'
import type { LinkAttrs } from 'prosekit/extensions/link'
import { InlinePopover } from 'prosekit/react/inline-popover'

import Button from '@acme/ui/components/button'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link,
  Heading1,
  Heading2,
  Heading3,
  // List,
} from '@acme/ui/components/icon'

import type { EditorExtension } from './editor-extension'

export default function EditorInlineMenu(): JSX.Element {
  const editor = useEditor<EditorExtension>({ update: true })

  const [linkMenuOpen, setLinkMenuOpen] = useState(false)
  const toggleLinkMenuOpen = () => setLinkMenuOpen((open) => !open)

  const getCurrentLink = (state: EditorState): string | undefined => {
    const { $from } = state.selection
    const marks = $from.marksAcross($from)

    if (!marks) {
      return
    }

    for (const mark of marks) {
      if (mark.type.name === 'link') {
        return (mark.attrs as LinkAttrs).href
      }
    }
  }

  const handleLinkUpdate = (href?: string) => {
    if (href) {
      editor.commands.addLink({ href })
    } else {
      editor.commands.removeLink()
    }

    setLinkMenuOpen(false)

    editor.focus()
  }

  return (
    <>
      <InlinePopover
        className='relative z-10 box-border flex min-w-[120px] space-x-1 overflow-auto whitespace-nowrap rounded-md border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-neutral-900'
        data-testid='inline-menu-main'
        onOpenChange={(open) => {
          if (!open) {
            setLinkMenuOpen(false)
          }
        }}
      >
        <Button
          className={editor.marks.bold.isActive() ? 'bg-secondary' : ''}
          disabled={!editor.commands.toggleBold.canApply()}
          onClick={() => editor.commands.toggleBold()}
          size='icon'
          variant='ghost'
        >
          <Bold className='size-5' />
        </Button>

        <Button
          className={editor.marks.italic.isActive() ? 'bg-secondary' : ''}
          disabled={!editor.commands.toggleItalic.canApply()}
          onClick={() => editor.commands.toggleItalic()}
          size='icon'
          variant='ghost'
        >
          <Italic className='size-5' />
        </Button>

        <Button
          className={editor.marks.underline.isActive() ? 'bg-secondary' : ''}
          disabled={!editor.commands.toggleUnderline.canApply()}
          onClick={() => editor.commands.toggleUnderline()}
          size='icon'
          variant='ghost'
        >
          <Underline className='size-5' />
        </Button>

        <Button
          className={editor.marks.strike.isActive() ? 'bg-secondary' : ''}
          disabled={!editor.commands.toggleStrike.canApply()}
          onClick={() => editor.commands.toggleStrike()}
          size='icon'
          variant='ghost'
        >
          <Strikethrough className='size-5' />
        </Button>

        {/* <Button
          className={editor.marks.code.isActive() ? 'bg-secondary' : ''}
          disabled={!editor.commands.toggleCode.canApply()}
          onClick={() => editor.commands.toggleCode()}
          tooltip='Code'
        >
          <div className='i-lucide-code size-5' />
        </Button> */}

        {editor.commands.addLink.canApply({ href: '' }) && (
          <Button
            className={editor.marks.link.isActive() ? 'bg-secondary' : ''}
            onClick={() => {
              editor.commands.expandLink()
              toggleLinkMenuOpen()
            }}
            size='icon'
            variant='ghost'
          >
            <Link className='size-5' />
          </Button>
        )}

        <Button
          disabled={!editor.commands.setHeading.canApply({ level: 1 })}
          onClick={() => editor.commands.toggleHeading({ level: 1 })}
          size='icon'
          variant='ghost'
        >
          <Heading1 className='size-5' />
        </Button>

        <Button
          disabled={!editor.commands.setHeading.canApply({ level: 2 })}
          onClick={() => editor.commands.toggleHeading({ level: 2 })}
          size='icon'
          variant='ghost'
        >
          <Heading2 className='size-5' />
        </Button>

        <Button
          disabled={!editor.commands.setHeading.canApply({ level: 3 })}
          onClick={() => editor.commands.toggleHeading({ level: 3 })}
          size='icon'
          variant='ghost'
        >
          <Heading3 className='size-5' />
        </Button>

        {/* <Button
          // className={editor.marks.list.isActive() ? 'bg-secondary' : ''}
          disabled={!editor.commands.toggleList.canApply({ kind: 'bullet' })}
          onClick={() => editor.commands.toggleList({ kind: 'bullet' })}
          size='icon'
          variant='ghost'
        >
          <List className='size-5' />
        </Button> */}
      </InlinePopover>

      <InlinePopover
        className='relative z-10 box-border flex w-xs flex-col items-stretch gap-y-2 rounded-lg border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-neutral-900'
        data-testid='inline-menu-link'
        defaultOpen={false}
        onOpenChange={setLinkMenuOpen}
        open={linkMenuOpen}
        placement='bottom'
      >
        {linkMenuOpen && (
          <form
            onSubmit={(event) => {
              event.preventDefault()
              const target = event.target as HTMLFormElement | null
              const href = target?.querySelector('input')?.value?.trim()
              handleLinkUpdate(href)
            }}
          >
            <input
              placeholder='Paste the link...'
              defaultValue={getCurrentLink(editor.state)}
              className='box-border flex h-9 w-full rounded-md border border-zinc-200 border-solid bg-white px-3 py-2 text-sm outline-none ring-0 ring-transparent transition disabled:cursor-not-allowed dark:border-zinc-800 file:border-0 dark:bg-neutral-900 file:bg-transparent file:font-medium dark:placeholder:text-zinc-500 file:text-sm placeholder:text-zinc-500 disabled:opacity-50 focus-visible:outline-none dark:focus-visible:ring-zinc-300 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-0'
            />
          </form>
        )}

        {/* {editor.marks.link.isActive() && (
          <button
            className='inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-zinc-900 px-3 font-medium text-sm text-zinc-50 ring-offset-white transition-colors disabled:pointer-events-none dark:bg-zinc-50 dark:hover:bg-zinc-50/90 hover:bg-zinc-900/90 dark:text-zinc-900 disabled:opacity-50 focus-visible:outline-none dark:focus-visible:ring-zinc-300 focus-visible:ring-2 focus-visible:ring-zinc-900 dark:ring-offset-neutral-900 focus-visible:ring-offset-2'
            onClick={() => handleLinkUpdate()}
            onMouseDown={(event) => event.preventDefault()}
            type='button'
          >
            Remove link
          </button>
        )} */}
      </InlinePopover>
    </>
  )
}

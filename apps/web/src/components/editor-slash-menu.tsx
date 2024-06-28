import { useEditor } from 'prosekit/react'
import {
  AutocompletePopover,
  AutocompleteList,
  AutocompleteEmpty,
  AutocompleteItem,
} from 'prosekit/react/autocomplete'

import type { EditorExtension } from './editor-extension'

export default function EditorSlashMenu() {
  const editor = useEditor<EditorExtension>()

  const handleHeadingInsert = (level: number) => {
    editor.commands.insertHeading({ level })
  }

  const handleHeadingConvert = (level: number) => {
    editor.commands.setHeading({ level })
  }

  return (
    <AutocompletePopover
      regex={/\/.*$/iu}
      className='relative z-10 box-border block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap rounded-lg border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-neutral-900'
    >
      <AutocompleteList>
        <AutocompleteEmpty className='relative box-border block min-w-[120px] cursor-default select-none scroll-my-1 whitespace-nowrap rounded px-3 py-1.5 outline-none dark:data-[focused]:bg-zinc-800 data-[focused]:bg-zinc-100'>
          No results
        </AutocompleteEmpty>

        <AutocompleteItem
          className='relative box-border block min-w-[120px] cursor-default select-none scroll-my-1 whitespace-nowrap rounded px-3 py-1.5 outline-none dark:data-[focused]:bg-zinc-800 data-[focused]:bg-zinc-100'
          onSelect={() => handleHeadingInsert(1)}
        >
          Insert Heading 1
        </AutocompleteItem>

        <AutocompleteItem
          className='relative box-border block min-w-[120px] cursor-default select-none scroll-my-1 whitespace-nowrap rounded px-3 py-1.5 outline-none dark:data-[focused]:bg-zinc-800 data-[focused]:bg-zinc-100'
          onSelect={() => handleHeadingInsert(2)}
        >
          Insert Heading 2
        </AutocompleteItem>

        <AutocompleteItem
          className='relative box-border block min-w-[120px] cursor-default select-none scroll-my-1 whitespace-nowrap rounded px-3 py-1.5 outline-none dark:data-[focused]:bg-zinc-800 data-[focused]:bg-zinc-100'
          onSelect={() => handleHeadingConvert(1)}
        >
          Turn into Heading 1
        </AutocompleteItem>

        <AutocompleteItem
          className='relative box-border block min-w-[120px] cursor-default select-none scroll-my-1 whitespace-nowrap rounded px-3 py-1.5 outline-none dark:data-[focused]:bg-zinc-800 data-[focused]:bg-zinc-100'
          onSelect={() => handleHeadingConvert(2)}
        >
          Turn into Heading 2
        </AutocompleteItem>
      </AutocompleteList>
    </AutocompletePopover>
  )
}

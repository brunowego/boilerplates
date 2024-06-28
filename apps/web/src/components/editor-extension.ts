import {
  union,
  defineDoc,
  defineText,
  defineParagraph,
  defineBaseCommands,
  defineBaseKeymap,
} from 'prosekit/core'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
// import { defineLinkSpec, defineLinkMarkRule } from 'prosekit/extensions/link'
import { defineBold } from 'prosekit/extensions/bold'
import { defineItalic } from 'prosekit/extensions/italic'
import { defineUnderline } from 'prosekit/extensions/underline'
import { defineStrike } from 'prosekit/extensions/strike'
import { defineHeading } from 'prosekit/extensions/heading'
import { defineLink } from 'prosekit/extensions/link'
import { defineImage } from 'prosekit/extensions/image'

// import { defineList } from 'prosekit/extensions/list'

// const defineAutoLink = () => {
//   return union([defineLinkSpec(), defineLinkMarkRule()])
// }

export function defineEditorExtension() {
  return union([
    definePlaceholder({
      placeholder: "Write something, or press '/' for commands...",
    }),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineBold(),
    defineItalic(),
    defineUnderline(),
    defineStrike(),
    defineLink(),
    defineImage(),
    defineHeading(),
    // defineList(),
    // defineAutoLink(),
    defineBaseCommands(),
    defineBaseKeymap(),
  ])
}

export type EditorExtension = ReturnType<typeof defineEditorExtension>

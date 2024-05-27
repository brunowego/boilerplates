import type { JSX } from 'react'

import Sidebar from '@/components/sidebar'
import Page from '@acme/ui/components/page'
import { typographyVariants } from '@acme/ui/components/typography'
// import Label from '@acme/ui/components/label'
// import RichTextEditor2 from '@acme/ui/components/rich-text-editor2'

import Editor from './component/editor'

export default function EditorPage(): JSX.Element {
  return (
    <>
      <Sidebar>
        {/* <div className='p-4'>
          <div className='space-y-2'>
            <Label>Editor</Label>

            <RichTextEditor2 />
          </div>
        </div> */}
      </Sidebar>

      <Page>
        <Page.Header>
          <h1
            className={typographyVariants({
              className: 'leading-8',
              variant: 'title',
            })}
          >
            Tiptap
          </h1>
        </Page.Header>

        <Page.Content>
          <Editor />
        </Page.Content>
      </Page>
    </>
  )
}

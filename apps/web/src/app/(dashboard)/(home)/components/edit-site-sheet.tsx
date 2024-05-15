import type { JSX } from 'react'

import Button from '@acme/ui/components/button'
import { Settings2 } from '@acme/ui/components/icon'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@acme/ui/components/sheet'

import EditSiteForm from './edit-site-form'

export default function EditSiteSheet(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost'>
          <Settings2 className='size-5' />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Acme</SheetTitle>
        </SheetHeader>

        <div className='p-4 lg:px-5'>
          <EditSiteForm />
        </div>
      </SheetContent>
    </Sheet>
  )
}

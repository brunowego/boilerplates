'use client'

import { type JSX, useState } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'
import { Avatar, AvatarFallback, AvatarImage } from '@acme/ui/components/avatar'

import { useUser } from '@/hooks/api/use-user'
import { Page, PageHeader, PageContent } from '@/components/page'
import ImageCrop from '@/components/image-crop'

// import EditPersonalForm from './edit-personal-form'

export default function EditPersonal(): JSX.Element {
  const { data: user, isLoading } = useUser()

  // const [croppedImage, setCroppedImage] = useState<string | null>(null)

  // const handleSubmit = (croppedDataUrl: string) => {}

  if (isLoading) {
    return <Page>Loading...</Page>
  }

  return (
    <Page>
      <PageHeader>
        <h1 className={typographyVariants({ variant: 'title' })}>Profile</h1>
      </PageHeader>

      <PageContent>
        <ImageCrop
          className='max-w-lg'
          image={user?.image as string}
          // setCroppedImage={setCroppedImage}
          // handleSubmit={handleSubmit}
          // setOpen={setOpen}
        />

        {/* <Avatar className='size-20'>
          <AvatarImage src={croppedImage as string} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}

        {/* <EditPersonalForm user={user} /> */}
      </PageContent>
    </Page>
  )
}

'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  typographyVariants,
} from '@acme/ui'

import { useGetProfile } from '@/hooks/api/use-profile'

import PictureSkeleton from './picture-skeleton'
import GeneralSkeleton from './general-skeleton'
import PictureUpdateDialog from './picture-update-dialog'
import PictureDeleteDialog from './picture-delete-dialog'
import GeneralForm from './general-form'

export default function Profile(): JSX.Element {
  const { data: user, isLoading: isUserLoading } = useGetProfile()

  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold tracking-tight leading-10'>
          Profile
        </h2>
      </div>

      {isUserLoading ? (
        <>
          <PictureSkeleton />

          <GeneralSkeleton />
        </>
      ) : (
        <>
          <Card className='max-w-2xl relative'>
            <CardHeader>
              <CardTitle>Picture</CardTitle>

              <CardDescription>Configure your picture.</CardDescription>
            </CardHeader>

            <CardContent className='flex space-x-4'>
              <PictureUpdateDialog user={user} />

              <div
                className={typographyVariants({
                  className: 'text-sm mt-4 flex flex-col space-y-1',
                  variant: 'muted',
                })}
              >
                <p>You can crop the image after uploading.</p>

                {user?.picture ? <PictureDeleteDialog /> : null}
              </div>
            </CardContent>
          </Card>

          <Card className='max-w-2xl relative'>
            <CardHeader>
              <CardTitle>General</CardTitle>

              <CardDescription>Configure your profile.</CardDescription>
            </CardHeader>

            <GeneralForm user={user} />
          </Card>
        </>
      )}
    </>
  )
}

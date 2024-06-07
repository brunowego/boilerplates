'use client'

import { type JSX, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import {
  toast,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@acme/ui'

import { api } from '@/lib/api'
import { handleError } from '@/utils'

export default function PictureDeleteDialog(): JSX.Element {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const mutation = useMutation({
    mutationFn: () => {
      return api.delete('/picture', {
        data: {
          intent: 'profile_picture',
        },
      })
    },
    onError(err) {
      toast.error(
        handleError(
          err,
          'Picture delete is currently not available, please try again later :(',
        ),
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })

      router.refresh()
    },
  })

  const handleDelete = () => {
    mutation.mutate()
  }

  return (
    <>
      <p>
        You can also{' '}
        <button
          className='text-white hover:underline underline-offset-2'
          onClick={() => setIsModalOpen(true)}
          type='button'
        >
          delete your picture.
        </button>
      </p>

      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your profile picture?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete your photo? Other users will see a
              placeholder picture instead. You can upload a new picture at any
              time.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Delete picture
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

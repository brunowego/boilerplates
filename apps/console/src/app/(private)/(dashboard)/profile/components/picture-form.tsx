'use client'

import type { z } from 'zod'
import { type HTMLAttributes, type JSX, useState, useCallback } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import Cropper, { type Area } from 'react-easy-crop'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  DialogFooter,
  Button,
  Icon,
  cn,
  toast,
} from '@acme/ui'

import { pictureSchema } from '@/schemas'
import { api } from '@/lib/api'
import { handleError } from '@/utils'

const formSchema = pictureSchema

type FormValues = z.infer<typeof formSchema>

async function getCroppedImg(
  file: File,
  pixelCrop: { x: number; y: number; width: number; height: number },
): Promise<Blob> {
  const image = new Image()
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  return new Promise((resolve, reject) => {
    image.onload = () => {
      canvas.width = pixelCrop.width
      canvas.height = pixelCrop.height

      if (ctx) {
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height,
        )
      }

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'))

          return
        }

        resolve(blob)
      }, 'image/webp')
    }

    image.src = URL.createObjectURL(file)
  })
}

interface PictureFormProps extends HTMLAttributes<HTMLFormElement> {
  selectedFile: File | null
  onOpenChange(open: boolean): void
}

export default function PictureForm({
  className,
  selectedFile,
  onOpenChange,
  ...props
}: PictureFormProps): JSX.Element | null {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const { register, formState, reset, handleSubmit, control, ...form } =
    useForm<FormValues>({
      mode: 'onChange',
      defaultValues: {
        file: selectedFile,
        intent: 'profile_picture',
      },
      resolver: zodResolver(formSchema),
    })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const formData = new FormData()

      if (values.file && croppedAreaPixels) {
        formData.append(
          'file',
          await getCroppedImg(values.file, croppedAreaPixels),
        )
      }

      formData.append('intent', values.intent)

      return api.put('/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    onError(err) {
      toast.error(
        handleError(
          err,
          'Picture update is currently not available, please try again later :(',
        ),
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })

      onOpenChange(false)
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    void mutation.mutate(values)
  }

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  if (!selectedFile) return null

  return (
    <Form {...{ register, formState, reset, handleSubmit, control, ...form }}>
      <form
        className={cn('grid space-y-4', className)}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <FormField
          control={control}
          name='file'
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormLabel className='sr-only'>File</FormLabel>

              <FormControl>
                <div className='relative h-96 w-full'>
                  <Cropper
                    aspect={1}
                    crop={crop}
                    image={URL.createObjectURL(selectedFile)}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    zoom={zoom}
                  />
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type='submit' variant='secondary'>
            {formState.isSubmitting ? (
              <Icon.loader2 className='animate-spin w-5' />
            ) : (
              'Update Picture'
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

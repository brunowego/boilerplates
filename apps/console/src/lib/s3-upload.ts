'use client'

import axios from 'axios'

import { generateId } from '@acme/id'

import { createImageUrl } from '../utils'
import { getFileUploadUrl } from './s3'

type UploadProps = {
  file: File
  onProgress?: (progress: number) => void
}

export const upload = async ({ file, onProgress }: UploadProps) => {
  try {
    const key = `${generateId()}/${file.name}`

    const { signedUrl } = await getFileUploadUrl({
      key,
      acl: 'public-read',
    })

    await axios.put(signedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total !== undefined) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          )

          if (onProgress) {
            onProgress(progress)
          }

          // console.log(`Progress: ${progress}%`);
        }
      },
    })

    return createImageUrl(key)
  } catch (err) {
    console.error('Error generating upload URL:', err)

    return null
  }
}

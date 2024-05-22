import api, { axios } from './api'

type FileUploadProps = {
  file: File
  onProgress?: (progress: number) => void
}

export default async function FileUpload({
  file,
  onProgress,
}: FileUploadProps) {
  try {
    const { url, key } = await api
      .post('/upload', { filename: file.name })
      .then((res) => res.data)

    await axios.put(url, file, {
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
        }
      },
    })

    return new URL(
      `/cdn/${key}?v=${Date.now()}`,
      process.env.NEXT_PUBLIC_BASE_URL,
    ).href
  } catch (err) {
    console.error('Error generating upload URL:', err)

    return null
  }
}

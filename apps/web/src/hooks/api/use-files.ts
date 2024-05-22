import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import api from '@/lib/api'
import type { File } from '@acme/db/schemas'

const fileKeys = {
  getFiles: () => ['files'] as const,
  getFile: (fileId: string) => ['files', fileId] as const,
}

const fetchFile = async (fileId: string) => {
  return (await api
    .get(`files/${fileId}`)
    .then((res) => res.data)) as Promise<File>
}

const fetchFiles = async () => {
  return (await api.get('files').then((res) => res.data)) as Promise<File[]>
}

export const useFile = ({
  fileId,
}: { fileId: string }): UseQueryResult<File | undefined, Error> => {
  return useQuery({
    queryKey: fileKeys.getFile(fileId),
    queryFn: () => fetchFile(fileId),
  })
}

export const useFiles = (): UseQueryResult<File[] | undefined, Error> => {
  return useQuery({
    queryKey: fileKeys.getFiles(),
    queryFn: () => fetchFiles(),
  })
}

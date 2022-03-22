import { Doc } from '@/types/doc'
import { API } from '@/utils/path'
import { MethodEnum } from '@/enums'
import { useQuery } from './'

export const handleReadDocs = async (): Promise<Doc[]> => {
  const result = await fetch(API.docs, {
    method: MethodEnum.Get,
  })

  return result.json()
}

export const useDocs = (): any => {
  return {
    docs: useQuery(['docs'], handleReadDocs),
  }
}

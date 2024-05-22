import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import api from '@/lib/api'
import type { Page } from '@acme/db/schemas'

const pageKeys = {
  getPages: () => ['pages'] as const,
  getPage: (pageId: string) => ['pages', pageId] as const,
}

const fetchPage = async (pageId: string) => {
  return (await api
    .get(`pages/${pageId}`)
    .then((res) => res.data)) as Promise<Page>
}

const fetchPages = async () => {
  return (await api.get('pages').then((res) => res.data)) as Promise<Page[]>
}

export const usePage = ({
  pageId,
}: { pageId: string }): UseQueryResult<Page | undefined, Error> => {
  return useQuery({
    queryKey: pageKeys.getPage(pageId),
    queryFn: () => fetchPage(pageId),
  })
}

export const usePages = (): UseQueryResult<Page[] | undefined, Error> => {
  return useQuery({
    queryKey: pageKeys.getPages(),
    queryFn: () => fetchPages(),
  })
}

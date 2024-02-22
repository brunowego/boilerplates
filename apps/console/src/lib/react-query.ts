import type { DefaultOptions } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/query-core'

export {
  QueryClientProvider,
  type UseQueryResult,
  useQuery,
  useMutation,
} from '@tanstack/react-query'
export { ReactQueryDevtools } from '@tanstack/react-query-devtools'
export { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

const defaultOptions: DefaultOptions = {
  queries: {
    // retry: false,
    staleTime: 5 * 1000, // 5 seconds
  },
}

export const queryClient = new QueryClient({
  defaultOptions,
})

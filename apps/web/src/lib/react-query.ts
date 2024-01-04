import { QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

let displayedNetworkFailureError = false

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount) {
        if (failureCount >= 3) {
          if (displayedNetworkFailureError === false) {
            displayedNetworkFailureError = true

            toast.error(
              'The application is taking longer than expected to load, please try again in a few minutes.',
              {
                onDismiss: () => {
                  displayedNetworkFailureError = false
                },
              },
            )
          }

          return false
        }

        return true
      },
    },
    mutations: {
      onError(error) {
        if (isAxiosError(error)) {
          if ('message' in error.response?.data) {
            toast.error(error.response?.data.message)
          } else {
            toast.error('Error processing operation!')
          }
        }
      },
    },
  },
})

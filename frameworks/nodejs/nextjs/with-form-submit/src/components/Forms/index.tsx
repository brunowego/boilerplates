import { isDev } from '@/utils'
import axios from 'axios'

export function sendFormSubmission<T>(
  data: T,
  formUrl: string,
  setSubmitted: (val: boolean) => void,
  setError: (val: boolean) => void
): void {
  if (isDev) {
    if (data instanceof FormData) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(Object.fromEntries(data), null, 2))
    } else {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(data, null, 2))
    }

    setSubmitted(true)
  } else {
    axios
      .post(formUrl, data, {
        headers: { Accept: 'application/json' },
      })
      .then((res) => {
        if (res.status === 200) {
          setSubmitted(res.status === 200)
        } else {
          setError(true)
        }
      })
      .catch(() => {
        setError(true)
      })
  }
}

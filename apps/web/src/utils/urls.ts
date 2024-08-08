export const getSearchParams = (url: string) => {
  const params = {} as Record<string, string>

  new URL(url).searchParams.forEach((val, key) => {
    params[key] = val
  })

  return params
}

export function createSearchParams(queryParams: Record<string, any>) {
  const isValidJSONObject =
    queryParams !== null &&
    typeof queryParams === 'object' &&
    !Array.isArray(queryParams)

  if (isValidJSONObject) {
    const searchParams = new URLSearchParams()

    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== '' && value !== null) {
        searchParams.append(key, String(value))
      }
    }

    return searchParams
  }
}

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function useRouterStuff() {
  const searchParams = useSearchParams()
  const searchParamsObj = Object.fromEntries(searchParams)
  const pathname = usePathname()
  const router = useRouter()

  const getQueryString = (
    kv?: Record<string, string>,
    opts?: {
      ignore?: string[]
    },
  ) => {
    const newParams = new URLSearchParams(searchParams)

    if (kv) {
      // biome-ignore lint/complexity/noForEach: This is a simple forEach loop
      Object.entries(kv).forEach(([k, v]) => newParams.set(k, v))
    }

    if (opts?.ignore) {
      // biome-ignore lint/complexity/noForEach: This is a simple forEach loop
      opts.ignore.forEach((k) => newParams.delete(k))
    }

    const queryString = newParams.toString()

    return queryString.length > 0 ? `?${queryString}` : ''
  }

  const queryParams = ({
    set,
    del,
    replace,
    getNewPath,
    arrayDelimiter = ',',
  }: {
    set?: Record<string, string | string[]>
    del?: string | string[]
    replace?: boolean
    getNewPath?: boolean
    arrayDelimiter?: string
  }) => {
    const newParams = new URLSearchParams(searchParams)

    if (set) {
      // biome-ignore lint/complexity/noForEach: This is a simple forEach loop
      Object.entries(set).forEach(([k, v]) =>
        newParams.set(k, Array.isArray(v) ? v.join(arrayDelimiter) : v),
      )
    }

    if (del) {
      if (Array.isArray(del)) {
        // biome-ignore lint/complexity/noForEach: This is a simple forEach loop
        del.forEach((k) => newParams.delete(k))
      } else {
        newParams.delete(del)
      }
    }

    const queryString = newParams.toString()
    const newPath = `${pathname}${
      queryString.length > 0 ? `?${queryString}` : ''
    }`

    if (getNewPath) {
      return newPath
    }

    if (replace) {
      router.replace(newPath, { scroll: false })
    } else {
      router.push(newPath)
    }
  }

  return {
    pathname,
    router,
    searchParams,
    searchParamsObj,
    queryParams,
    getQueryString,
  }
}

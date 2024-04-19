interface SWRError extends Error {
  status: number
}

// biome-ignore lint/suspicious/noExplicitAny: This is a generic fetcher
export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const error = await res.text()
    const err = new Error(error) as SWRError

    err.status = res.status

    throw err
  }

  return res.json()
}

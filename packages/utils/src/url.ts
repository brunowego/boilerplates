const port = process.env.PORT || 8000

export function absoluteUrl(path = '') {
  const baseUrl = process.env.APP_BASE_URL ?? `http://127.0.0.1:${port}`

  return `${baseUrl}${path}`
}

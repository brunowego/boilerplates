export const toLocalDate = (value: Date) => {
  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  })
}

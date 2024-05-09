import _slugify from 'slugify'

export default function slugify(input: string): string {
  return _slugify(input, {
    replacement: '-',
    lower: true,
    strict: true,
  })
}

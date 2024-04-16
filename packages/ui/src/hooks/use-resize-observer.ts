import { type RefObject, useState, useEffect } from 'react'

export default function useResizeObserver(
  elementRef: RefObject<Element>,
): ResizeObserverEntry | undefined {
  const [entry, setEntry] = useState<ResizeObserverEntry>()

  const updateEntry = ([entry]: ResizeObserverEntry[]): void => {
    setEntry(entry)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: This is a custom hook
  useEffect(() => {
    const node = elementRef?.current

    if (!node) return

    const observer = new ResizeObserver(updateEntry)

    observer.observe(node)

    return () => observer.disconnect()
  }, [elementRef])

  return entry
}

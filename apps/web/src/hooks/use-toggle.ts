import { useState, useCallback } from 'react'

export default function useToggle(
  initialState = false,
): [
  isToggled: boolean,
  toggle: (next?: boolean) => void,
  toggleOn: () => void,
  toggleOff: () => void,
] {
  const [isToggled, setIsToggled] = useState(initialState)

  const toggle = useCallback(
    (next?: boolean) =>
      setIsToggled((prevState) =>
        typeof next === 'boolean' ? next : !prevState,
      ),
    [],
  )

  const toggleOn = useCallback(() => toggle(true), [toggle])
  const toggleOff = useCallback(() => toggle(false), [toggle])

  return [isToggled, toggle, toggleOn, toggleOff]
}

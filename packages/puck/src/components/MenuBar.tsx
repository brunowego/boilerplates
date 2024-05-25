import type { Dispatch, ReactElement, SetStateAction } from 'react'

import Button from '@acme/ui/components/button'
import { Undo, Redo } from '@acme/ui/components/icon'

import type { AppState, Data } from '../types/Config'
import type { PuckAction } from '../reducer'
import { useAppContext } from './Puck/context'

type MenuBarProps = {
  appState: AppState
  data: Data
  dispatch: (action: PuckAction) => void
  onPublish?: (data: Data) => void
  menuOpen: boolean
  renderHeaderActions?: (props: {
    state: AppState
    dispatch: (action: PuckAction) => void
  }) => ReactElement
  setMenuOpen: Dispatch<SetStateAction<boolean>>
}

export const MenuBar = ({
  appState,
  data = { content: [], root: {} },
  dispatch,
  menuOpen = false,
  onPublish,
  renderHeaderActions,
  setMenuOpen,
}: MenuBarProps) => {
  const {
    history: { back, forward, historyStore },
  } = useAppContext()

  const { hasFuture = false, hasPast = false } = historyStore || {}

  return (
    <div
      className='flex items-center space-x-4'
      onClick={(event) => {
        const element = event.target as HTMLElement

        if (window.matchMedia('(min-width: 638px)').matches) {
          return
        }

        if (
          element.tagName === 'A' &&
          element.getAttribute('href')?.startsWith('#')
        ) {
          setMenuOpen(false)
        }
      }}
    >
      <div className='flex items-center space-x-1'>
        <Button disabled={!hasPast} onClick={back} size='icon' variant='ghost'>
          <Undo className='size-4' />
        </Button>

        <Button
          disabled={!hasFuture}
          onClick={forward}
          size='icon'
          variant='ghost'
        >
          <Redo className='size-4' />
        </Button>
      </div>

      {renderHeaderActions?.({
        state: appState,
        dispatch,
      })}
    </div>
  )
}

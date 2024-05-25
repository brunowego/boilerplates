import { useHotkeys } from 'react-hotkeys-hook'

import type { PuckAction } from '../reducer'
import type { AppState } from '../types/Config'
import type { HistoryStore } from './use-history-store'

export type PuckHistory = {
  back: VoidFunction
  forward: VoidFunction
  historyStore: HistoryStore
}

type usePuckHistoryProps = {
  dispatch: (action: PuckAction) => void
  initialAppState: AppState
  historyStore: HistoryStore
}

export function usePuckHistory({
  dispatch,
  initialAppState,
  historyStore,
}: usePuckHistoryProps) {
  const back = () => {
    if (historyStore.hasPast) {
      dispatch({
        type: 'set',
        state: historyStore.prevHistory?.data || initialAppState,
      })

      historyStore.back()
    }
  }

  const forward = () => {
    if (historyStore.nextHistory) {
      dispatch({ type: 'set', state: historyStore.nextHistory.data })

      historyStore.forward()
    }
  }

  useHotkeys('meta+z', back, { preventDefault: true })
  useHotkeys('meta+shift+z', forward, { preventDefault: true })
  useHotkeys('meta+y', forward, { preventDefault: true })

  return {
    back,
    forward,
    historyStore,
  }
}

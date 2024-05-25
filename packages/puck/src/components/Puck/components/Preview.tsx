import { type ReactNode, useCallback, type FC, useRef } from 'react'

import type { DefaultRootProps } from '../../../types/Config'
import { useAppContext } from '../context'
import { DropZone } from '../../DropZone'
import AutoFrame from '../../AutoFrame'
import { rootDroppableId } from '../../../lib/root-droppable-id'

type PageProps = DefaultRootProps & { children: ReactNode }

type PreviewProps = { id?: string }

export const Preview = ({ id = 'puck-preview' }: PreviewProps) => {
  const { config, dispatch, state, setStatus, iframe } = useAppContext()

  const Page = useCallback<FC<PageProps>>(
    (pageProps) =>
      config.root?.render ? (
        config.root?.render({
          id: 'puck-root',
          ...pageProps,
          editMode: true,
          puck: { renderDropZone: DropZone },
        })
      ) : (
        <>{pageProps.children}</>
      ),
    [config.root],
  )

  // DEPRECATED
  const rootProps = state.data.root.props || state.data.root

  const ref = useRef<HTMLIFrameElement>(null)

  return (
    <div
      className='h-full'
      id={id}
      onClick={() => {
        dispatch({ type: 'setUi', ui: { ...state.ui, itemSelector: null } })
      }}
    >
      {iframe.enabled ? (
        <AutoFrame
          className='h-full w-full'
          data-rfd-iframe
          id='preview-frame'
          onStylesLoaded={() => {
            setStatus('READY')
          }}
          ref={ref}
        >
          <Page dispatch={dispatch} state={state} {...rootProps}>
            <DropZone zone={rootDroppableId} />
          </Page>
        </AutoFrame>
      ) : (
        <div id='preview-frame'>
          <Page dispatch={dispatch} state={state} {...rootProps}>
            <DropZone zone={rootDroppableId} />
          </Page>
        </div>
      )}
    </div>
  )
}

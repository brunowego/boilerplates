import {
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import type { DragStart, DragUpdate } from '@measured/dnd'

import {
  ChevronDown,
  ChevronUp,
  Globe,
  PanelLeft,
  PanelRight,
} from '@acme/ui/components/icon'

import type { AppState, Config, Data, UiState } from '../../types/Config'
import { Button } from '../Button'
import type { Plugin } from '../../types/Plugin'
import { usePlaceholderStyle } from '../../lib/use-placeholder-style'
import { SidebarSection } from '../SidebarSection'
import { Heading } from '../Heading'
import { IconButton } from '../IconButton/IconButton'
import { DropZoneProvider } from '../DropZone'
import { type ItemSelector, getItem } from '../../lib/get-item'
import {
  type PuckAction,
  type StateReducer,
  createReducer,
} from '../../reducer'
import { flushZones } from '../../lib/flush-zones'
import getClassNameFactory from '../../lib/get-class-name-factory'
import { AppProvider, defaultAppState } from './context'
import { useResolvedData } from '../../lib/use-resolved-data'
import { MenuBar } from '../MenuBar'
import styles from './styles.module.css'
import { Fields } from './components/Fields'
import { Components } from './components/Components'
import { Preview } from './components/Preview'
import { Outline } from './components/Outline'
import type { Overrides } from '../../types/Overrides'
import { loadOverrides } from '../../lib/load-overrides'
import { usePuckHistory } from '../../lib/use-puck-history'
import { useHistoryStore } from '../../lib/use-history-store'
import { Canvas } from './components/Canvas'
import { defaultViewports } from '../ViewportControls/default-viewports'
import type { Viewports } from '../../types/Viewports'
import { DragDropContext } from '../DragDropContext'
import type { IframeConfig } from '../../types/IframeConfig'

const getClassName = getClassNameFactory('Puck', styles)

export function Puck<UserConfig extends Config = Config>({
  children,
  config,
  data: initialData = { content: [], root: {} },
  ui: initialUi,
  onChange,
  onPublish,
  plugins = [],
  overrides = {},
  renderHeader,
  renderHeaderActions,
  headerTitle,
  headerPath,
  viewports = defaultViewports,
  iframe = {
    enabled: true,
  },
  dnd,
}: {
  children?: ReactNode
  config: UserConfig
  data: Partial<Data>
  ui?: Partial<UiState>
  onChange?: (data: Data) => void
  onPublish?: (data: Data) => void
  plugins?: Plugin[]
  overrides?: Partial<Overrides>
  renderHeader?: (props: {
    children: ReactNode
    dispatch: (action: PuckAction) => void
    state: AppState
  }) => ReactElement
  renderHeaderActions?: (props: {
    state: AppState
    dispatch: (action: PuckAction) => void
  }) => ReactElement
  headerTitle?: string
  headerPath?: string
  viewports?: Viewports
  iframe?: IframeConfig
  dnd?: {
    disableAutoScroll?: boolean
  }
}) {
  const historyStore = useHistoryStore()

  const [reducer] = useState(() =>
    createReducer<UserConfig>({ config, record: historyStore.record }),
  )

  const [initialAppState] = useState<AppState>(() => {
    const initial = { ...defaultAppState.ui, ...initialUi }

    let clientUiState: Partial<AppState['ui']> = {}

    if (typeof window !== 'undefined') {
      // Hide side bars on mobile
      if (window.matchMedia('(max-width: 638px)').matches) {
        clientUiState = {
          ...clientUiState,
          leftSideBarVisible: false,
          rightSideBarVisible: false,
        }
      }

      const viewportWidth = window.innerWidth

      const viewportDifferences = Object.entries(viewports)
        .map(([key, value]) => ({
          key,
          diff: Math.abs(viewportWidth - value.width),
        }))
        .sort((a, b) => (a.diff > b.diff ? 1 : -1))

      // @ts-ignore
      const closestViewport = viewportDifferences[0].key

      if (iframe.enabled) {
        clientUiState = {
          viewports: {
            ...initial.viewports,

            current: {
              ...initial.viewports.current,
              height:
                initialUi?.viewports?.current?.height ||
                // @ts-ignore
                viewports[closestViewport].height ||
                'auto',
              width:
                initialUi?.viewports?.current?.width ||
                // @ts-ignore
                viewports[closestViewport].width,
            },
          },
        }
      }
    }

    // DEPRECATED
    if (
      Object.keys(initialData?.root || {}).length > 0 &&
      !initialData?.root?.props
    ) {
      console.error(
        'Warning: Defining props on `root` is deprecated. Please use `root.props`, or republish this page to migrate automatically.',
      )
    }

    // Deprecated
    const rootProps = initialData?.root?.props || initialData?.root || {}

    const defaultedRootProps = {
      ...config.root?.defaultProps,
      ...rootProps,
    }

    return {
      ...defaultAppState,
      data: {
        ...initialData,
        root: { ...initialData?.root, props: defaultedRootProps },
        content: initialData.content || [],
      },
      ui: {
        ...initial,
        ...clientUiState,
        // Store categories under componentList on state to allow render functions and plugins to modify
        componentList: config.categories
          ? Object.entries(config.categories).reduce(
              (acc, [categoryName, category]) => {
                return {
                  // biome-ignore lint/performance/noAccumulatingSpread: This is a shallow copy
                  ...acc,
                  [categoryName]: {
                    title: category.title,
                    components: category.components,
                    expanded: category.defaultExpanded,
                    visible: category.visible,
                  },
                }
              },
              {},
            )
          : {},
      },
    }
  })

  const [appState, dispatch] = useReducer<StateReducer>(
    reducer,
    flushZones(initialAppState),
  )

  const { data, ui } = appState

  const history = usePuckHistory({ dispatch, initialAppState, historyStore })

  const { resolveData, componentState } = useResolvedData(
    appState,
    config,
    dispatch,
  )

  const [menuOpen, setMenuOpen] = useState(false)

  const { itemSelector, leftSideBarVisible, rightSideBarVisible } = ui

  const setItemSelector = useCallback(
    (newItemSelector: ItemSelector | null) => {
      if (newItemSelector === itemSelector) {
        return
      }

      dispatch({
        type: 'setUi',
        ui: { itemSelector: newItemSelector },
        recordHistory: true,
      })
    },
    [itemSelector],
  )

  const selectedItem = itemSelector ? getItem(itemSelector, data) : null

  useEffect(() => {
    if (onChange) {
      onChange(data)
    }
  }, [data])

  const { onDragStartOrUpdate, placeholderStyle } = usePlaceholderStyle()

  const [draggedItem, setDraggedItem] = useState<
    DragStart & Partial<DragUpdate>
  >()

  // DEPRECATED
  const rootProps = data.root.props || data.root

  const toggleSidebars = useCallback(
    (sidebar: 'left' | 'right') => {
      const widerViewport = window.matchMedia('(min-width: 638px)').matches
      const sideBarVisible =
        sidebar === 'left' ? leftSideBarVisible : rightSideBarVisible
      const oppositeSideBar =
        sidebar === 'left' ? 'rightSideBarVisible' : 'leftSideBarVisible'

      dispatch({
        type: 'setUi',
        ui: {
          [`${sidebar}SideBarVisible`]: !sideBarVisible,
          ...(!widerViewport ? { [oppositeSideBar]: false } : {}),
        },
      })
    },
    [dispatch, leftSideBarVisible, rightSideBarVisible],
  )

  useEffect(() => {
    if (!window.matchMedia('(min-width: 638px)').matches) {
      dispatch({
        type: 'setUi',
        ui: {
          leftSideBarVisible: false,
          rightSideBarVisible: false,
        },
      })
    }

    const handleResize = () => {
      if (!window.matchMedia('(min-width: 638px)').matches) {
        dispatch({
          type: 'setUi',
          ui: (ui) => ({
            ...ui,
            ...(ui.rightSideBarVisible ? { leftSideBarVisible: false } : {}),
          }),
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const defaultRender = useMemo<
    React.FunctionComponent<{ children?: ReactNode }>
  >(() => {
    const PuckDefault = ({ children }: { children?: ReactNode }) => (
      <>{children}</>
    )

    return PuckDefault
  }, [])

  // DEPRECATED
  const defaultHeaderRender = useMemo(() => {
    if (renderHeader) {
      console.warn(
        '`renderHeader` is deprecated. Please use `overrides.header` and the `usePuck` hook instead',
      )

      // @ts-ignore
      const RenderHeader = ({ actions, ...props }) => {
        // biome-ignore lint/style/noNonNullAssertion: This is a controlled environment
        const Comp = renderHeader!

        return (
          <Comp {...props} dispatch={dispatch} state={appState}>
            {actions}
          </Comp>
        )
      }

      return RenderHeader
    }

    return defaultRender
  }, [renderHeader])

  // DEPRECATED
  const defaultHeaderActionsRender = useMemo(() => {
    if (renderHeaderActions) {
      console.warn(
        '`renderHeaderActions` is deprecated. Please use `overrides.headerActions` and the `usePuck` hook instead.',
      )

      const RenderHeader = (props: any) => {
        // biome-ignore lint/style/noNonNullAssertion: This is a controlled environment
        const Comp = renderHeaderActions!

        return <Comp {...props} dispatch={dispatch} state={appState} />
      }

      return RenderHeader
    }

    return defaultRender
  }, [renderHeader])

  // Load all plugins into the overrides
  const loadedOverrides = useMemo(() => {
    return loadOverrides({ overrides, plugins })
  }, [plugins])

  const CustomPuck = useMemo(
    () => loadedOverrides.puck || defaultRender,
    [loadedOverrides],
  )

  const CustomHeader = useMemo(
    () => loadedOverrides.header || defaultHeaderRender,
    [loadedOverrides],
  )

  const CustomHeaderActions = useMemo(
    () => loadedOverrides.headerActions || defaultHeaderActionsRender,
    [loadedOverrides],
  )

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <AppProvider
      value={{
        state: appState,
        dispatch,
        config,
        componentState,
        resolveData,
        plugins,
        overrides: loadedOverrides,
        history,
        viewports,
        iframe,
      }}
    >
      <DragDropContext
        autoScrollerOptions={{ disabled: dnd?.disableAutoScroll }}
        onDragUpdate={(update) => {
          setDraggedItem({ ...draggedItem, ...update })
          onDragStartOrUpdate(update)
        }}
        onBeforeDragStart={(start) => {
          onDragStartOrUpdate(start)
          setItemSelector(null)
          dispatch({ type: 'setUi', ui: { isDragging: true } })
        }}
        onDragEnd={(droppedItem) => {
          setDraggedItem(undefined)
          dispatch({ type: 'setUi', ui: { isDragging: false } })

          // User cancel drag
          if (!droppedItem.destination) {
            return
          }

          // New component
          if (
            droppedItem.source.droppableId.startsWith('component-list') &&
            droppedItem.destination
          ) {
            const [_, componentType] = droppedItem.draggableId.split('::')

            dispatch({
              type: 'insert',
              componentType: componentType || droppedItem.draggableId,
              destinationIndex: droppedItem.destination?.index,
              destinationZone: droppedItem.destination.droppableId,
            })

            setItemSelector({
              index: droppedItem.destination?.index,
              zone: droppedItem.destination.droppableId,
            })

            return
          }

          const { source, destination } = droppedItem

          if (source.droppableId === destination.droppableId) {
            dispatch({
              type: 'reorder',
              sourceIndex: source.index,
              destinationIndex: destination.index,
              destinationZone: destination.droppableId,
            })
          } else {
            dispatch({
              type: 'move',
              sourceZone: source.droppableId,
              sourceIndex: source.index,
              destinationIndex: destination.index,
              destinationZone: destination.droppableId,
            })
          }

          setItemSelector({
            index: destination.index,
            zone: destination.droppableId,
          })
        }}
      >
        <DropZoneProvider
          value={{
            data,
            itemSelector,
            setItemSelector,
            config,
            dispatch,
            draggedItem,
            placeholderStyle,
            mode: 'edit',
            areaId: 'root',
          }}
        >
          <CustomPuck>
            {children || (
              <div
                className={getClassName({
                  leftSideBarVisible,
                  menuOpen,
                  mounted,
                  rightSideBarVisible,
                })}
              >
                <div className={getClassName('layout')}>
                  <CustomHeader
                    actions={
                      <>
                        <CustomHeaderActions>
                          <Button
                            icon={<Globe size='14px' />}
                            onClick={() => {
                              onPublish?.(data)
                            }}
                          >
                            Publish
                          </Button>
                        </CustomHeaderActions>
                      </>
                    }
                  >
                    <header className={getClassName('header')}>
                      <div className={getClassName('headerInner')}>
                        <div className={getClassName('headerToggle')}>
                          <div className={getClassName('leftSideBarToggle')}>
                            <IconButton
                              onClick={() => {
                                toggleSidebars('left')
                              }}
                              title='Toggle left sidebar'
                            >
                              <PanelLeft focusable='false' />
                            </IconButton>
                          </div>

                          <div className={getClassName('rightSideBarToggle')}>
                            <IconButton
                              onClick={() => {
                                toggleSidebars('right')
                              }}
                              title='Toggle right sidebar'
                            >
                              <PanelRight focusable='false' />
                            </IconButton>
                          </div>
                        </div>

                        <div className={getClassName('headerTitle')}>
                          <Heading rank={2} size='xs'>
                            {headerTitle || rootProps.title || 'Page'}
                            {headerPath && (
                              <>
                                {' '}
                                <code className={getClassName('headerPath')}>
                                  {headerPath}
                                </code>
                              </>
                            )}
                          </Heading>
                        </div>

                        <div className={getClassName('headerTools')}>
                          <div className={getClassName('menuButton')}>
                            <IconButton
                              onClick={() => {
                                return setMenuOpen(!menuOpen)
                              }}
                              title='Toggle menu bar'
                            >
                              {menuOpen ? (
                                <ChevronUp focusable='false' />
                              ) : (
                                <ChevronDown focusable='false' />
                              )}
                            </IconButton>
                          </div>

                          <MenuBar
                            appState={appState}
                            data={data}
                            dispatch={dispatch}
                            onPublish={onPublish}
                            menuOpen={menuOpen}
                            renderHeaderActions={() => (
                              <CustomHeaderActions>
                                <Button
                                  icon={<Globe size='14px' />}
                                  onClick={() => {
                                    onPublish?.(data)
                                  }}
                                >
                                  Publish
                                </Button>
                              </CustomHeaderActions>
                            )}
                            setMenuOpen={setMenuOpen}
                          />
                        </div>
                      </div>
                    </header>
                  </CustomHeader>

                  <div className={getClassName('leftSideBar')}>
                    <SidebarSection title='Components' noBorderTop>
                      <Components />
                    </SidebarSection>

                    <SidebarSection title='Outline'>
                      <Outline />
                    </SidebarSection>
                  </div>

                  <Canvas />

                  <div className={getClassName('rightSideBar')}>
                    <SidebarSection
                      noPadding
                      noBorderTop
                      showBreadcrumbs
                      title={
                        selectedItem
                          ? // @ts-ignore
                            config.components[selectedItem.type].label ??
                            selectedItem.type
                          : 'Page'
                      }
                    >
                      <Fields />
                    </SidebarSection>
                  </div>
                </div>

                <div id='puck-portal-root' className={getClassName('portal')} />
              </div>
            )}
          </CustomPuck>
        </DropZoneProvider>
      </DragDropContext>
    </AppProvider>
  )
}

Puck.Components = Components
Puck.Fields = Fields
Puck.Outline = Outline
Puck.Preview = Preview

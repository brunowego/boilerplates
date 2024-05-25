import { useContext, useEffect } from 'react'

import cn from '@acme/ui/utils/cn'

import { Droppable } from '../Droppable'
import { DraggableComponent } from '../DraggableComponent'
import { getItem } from '../../lib/get-item'
import { setupZone } from '../../lib/setup-zone'
import { rootDroppableId } from '../../lib/root-droppable-id'
import { DropZoneProvider, dropZoneContext } from './context'
import { getZoneId } from '../../lib/get-zone-id'
import { useAppContext } from '../Puck/context'
import type { DropZoneProps } from './types'

import { getClassNameFactory } from '../../lib'
import styles from './styles.module.css'

const getClassName = getClassNameFactory('DropZone', styles)

export { DropZoneProvider, dropZoneContext } from './context'

function DropZoneEdit({ zone, allow, disallow, style }: DropZoneProps) {
  const appContext = useAppContext()
  const ctx = useContext(dropZoneContext)

  const {
    // These all need setting via context
    data,
    dispatch = () => null,
    config,
    itemSelector,
    setItemSelector = () => null,
    areaId,
    draggedItem,
    placeholderStyle,
    registerZoneArea,
    areasWithZones,
    hoveringComponent,
    zoneWillDrag,
    setZoneWillDrag = () => null,
    // biome-ignore lint/style/noNonNullAssertion: This is a fallback
  } = ctx! || {}

  let content = data.content || []
  let zoneCompound = rootDroppableId

  useEffect(() => {
    if (areaId && registerZoneArea) {
      registerZoneArea(areaId)
    }
  }, [areaId])

  // Register and unregister zone on mount
  useEffect(() => {
    if (ctx?.registerZone) {
      ctx?.registerZone(zoneCompound)
    }

    return () => {
      if (ctx?.unregisterZone) {
        ctx?.unregisterZone(zoneCompound)
      }
    }
  }, [])

  if (areaId) {
    if (zone !== rootDroppableId) {
      zoneCompound = `${areaId}:${zone}`
      // @ts-ignore
      content = setupZone(data, zoneCompound).zones[zoneCompound]
    }
  }

  const isRootZone =
    zoneCompound === rootDroppableId ||
    zone === rootDroppableId ||
    areaId === 'root'

  const draggedSourceId = draggedItem?.source.droppableId
  const draggedDestinationId = draggedItem?.destination?.droppableId
  const [zoneArea] = getZoneId(zoneCompound)

  const [draggedSourceArea] = getZoneId(draggedSourceId)

  const userWillDrag = zoneWillDrag === zone

  const userIsDragging = !!draggedItem
  const draggingOverArea = userIsDragging && zoneArea === draggedSourceArea
  const draggingNewComponent = draggedSourceId?.startsWith('component-list')

  if (
    !ctx?.config ||
    !ctx.setHoveringArea ||
    !ctx.setHoveringZone ||
    !ctx.setHoveringComponent ||
    !ctx.setItemSelector ||
    !ctx.registerPath ||
    !ctx.dispatch
  ) {
    return <div>DropZone requires context to work.</div>
  }

  const {
    hoveringArea = 'root',
    setHoveringArea,
    hoveringZone,
    setHoveringZone,
    setHoveringComponent,
  } = ctx

  const hoveringOverArea = hoveringArea ? hoveringArea === zoneArea : isRootZone
  const hoveringOverZone = hoveringZone === zoneCompound

  let isEnabled = userWillDrag

  if (userIsDragging) {
    if (draggingNewComponent) {
      if (appContext.safariFallbackMode) {
        isEnabled = true
      } else {
        isEnabled = hoveringOverArea
      }
    } else {
      isEnabled = draggingOverArea && hoveringOverZone
    }
  }

  if (isEnabled && userIsDragging && (allow || disallow)) {
    const [_, componentType] = draggedItem.draggableId.split('::')

    if (disallow) {
      const defaultedAllow = allow || []

      // remove any explicitly allowed items from disallow
      const filteredDisallow = (disallow || []).filter(
        (item) => defaultedAllow.indexOf(item) === -1,
      )

      if (filteredDisallow.indexOf(componentType as string) !== -1) {
        isEnabled = false
      }
    } else if (allow) {
      if (allow.indexOf(componentType as string) === -1) {
        isEnabled = false
      }
    }
  }

  const selectedItem = itemSelector ? getItem(itemSelector, data) : null
  const isAreaSelected = selectedItem && zoneArea === selectedItem.props.id
  // const isDestination = draggedDestinationId === zoneCompound
  const hasChildren = content.length > 0

  return (
    <div
      className={cn(
        'relative mx-auto min-h-full w-full',
        !hasChildren ? 'outline-dashed outline-indigo-300' : null,
        getClassName({
          // isRootZone,
          userIsDragging,
          draggingOverArea,
          hoveringOverArea,
          draggingNewComponent,
          isDisabled: !isEnabled,
          isAreaSelected,
          // isDestination,
          // hasChildren,
        }),
      )}
      onMouseUp={() => {
        setZoneWillDrag('')
      }}
    >
      <Droppable
        direction={'vertical'}
        droppableId={zoneCompound}
        isDropDisabled={!isEnabled}
      >
        {(provided, snapshot) => {
          return (
            <div
              {...(provided || { droppableProps: {} }).droppableProps}
              className={cn('h-full', !hasChildren ? 'min-h-24' : null)}
              id={zoneCompound}
              onMouseOver={(e) => {
                e.stopPropagation()
                setHoveringArea(zoneArea as string)
                setHoveringZone(zoneCompound)
              }}
              ref={provided?.innerRef}
              style={style}
            >
              {content.map((item, i) => {
                const componentId = item.props.id

                const defaultedProps = {
                  ...config.components[item.type]?.defaultProps,
                  ...item.props,
                  puck: { renderDropZone: DropZone },
                  editMode: true,
                }

                const isSelected =
                  selectedItem?.props.id === componentId || false

                const isDragging =
                  (draggedItem?.draggableId || 'draggable-').split(
                    'draggable-',
                  )[1] === componentId

                const containsZone = areasWithZones
                  ? areasWithZones[componentId]
                  : false

                const Render = config.components[item.type]
                  ? // @ts-ignore
                    config.components[item.type].render
                  : () => (
                      <div style={{ padding: 48, textAlign: 'center' }}>
                        No configuration for {item.type}
                      </div>
                    )

                return (
                  <div
                    className='relative'
                    key={item.props.id}
                    style={{ zIndex: isDragging ? 1 : undefined }}
                  >
                    <DropZoneProvider
                      value={{
                        ...ctx,
                        areaId: componentId,
                      }}
                    >
                      <DraggableComponent
                        label={
                          // @ts-ignore
                          config.components[item.type].label ??
                          item.type.toString()
                        }
                        id={`draggable-${componentId}`}
                        index={i}
                        isSelected={isSelected}
                        isLocked={userIsDragging}
                        forceHover={
                          hoveringComponent === componentId && !userIsDragging
                        }
                        indicativeHover={
                          userIsDragging &&
                          containsZone &&
                          hoveringArea === componentId
                        }
                        // @ts-ignore
                        isLoading={
                          appContext.componentState[componentId]?.loading
                        }
                        onMount={() => {
                          ctx.registerPath?.({
                            index: i,
                            zone: zoneCompound,
                          })
                        }}
                        onClick={(e) => {
                          setItemSelector({
                            index: i,
                            zone: zoneCompound,
                          })
                          e.stopPropagation()
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation()
                          setZoneWillDrag(zone)
                        }}
                        onMouseOver={(e) => {
                          e.stopPropagation()

                          if (containsZone) {
                            setHoveringArea(componentId)
                          } else {
                            setHoveringArea(zoneArea as string)
                          }

                          setHoveringComponent(componentId)

                          setHoveringZone(zoneCompound)
                        }}
                        onMouseOut={() => {
                          setHoveringArea(null)
                          setHoveringZone(null)
                          setHoveringComponent(null)
                        }}
                        onDelete={(e) => {
                          dispatch({
                            type: 'remove',
                            index: i,
                            zone: zoneCompound,
                          })

                          setItemSelector(null)

                          e.stopPropagation()
                        }}
                        onDuplicate={(e) => {
                          dispatch({
                            type: 'duplicate',
                            sourceIndex: i,
                            sourceZone: zoneCompound,
                          })

                          setItemSelector({
                            zone: zoneCompound,
                            index: i + 1,
                          })

                          e.stopPropagation()
                        }}
                        style={{
                          pointerEvents:
                            userIsDragging && draggingNewComponent
                              ? 'all'
                              : undefined,
                        }}
                      >
                        <Render {...defaultedProps} />
                      </DraggableComponent>
                    </DropZoneProvider>

                    {userIsDragging && (
                      <div
                        className='-bottom-3 absolute z-10 h-6 w-full'
                        onMouseOver={(e) => {
                          e.stopPropagation()
                          setHoveringArea(zoneArea as string)
                          setHoveringZone(zoneCompound)
                        }}
                      />
                    )}
                  </div>
                )
              })}
              {provided?.placeholder}

              {snapshot?.isDraggingOver && (
                <div
                  data-puck-placeholder
                  style={{
                    ...placeholderStyle,
                    background: 'var(--puck-color-azure-06)',
                    opacity: 0.3,
                    zIndex: 0,
                  }}
                />
              )}
            </div>
          )
        }}
      </Droppable>
    </div>
  )
}

function DropZoneRender({ zone }: DropZoneProps) {
  const ctx = useContext(dropZoneContext)

  const { data, areaId = 'root', config } = ctx || {}

  let zoneCompound = rootDroppableId
  let content = data?.content || []

  if (!data || !config) {
    return null
  }

  if (areaId && zone && zone !== rootDroppableId) {
    zoneCompound = `${areaId}:${zone}`
    // @ts-ignore
    content = setupZone(data, zoneCompound).zones[zoneCompound]
  }

  return (
    <>
      {content.map((item) => {
        const Component = config.components[item.type]

        if (Component) {
          return (
            <DropZoneProvider
              key={item.props.id}
              value={{ data, config, areaId: item.props.id }}
            >
              <Component.render
                {...item.props}
                puck={{ renderDropZone: DropZone }}
              />
            </DropZoneProvider>
          )
        }

        return null
      })}
    </>
  )
}

export function DropZone(props: DropZoneProps) {
  const ctx = useContext(dropZoneContext)

  if (ctx?.mode === 'edit') {
    return <DropZoneEdit {...props} />
  }

  return <DropZoneRender {...props} />
}

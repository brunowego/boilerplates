import { useCallback, useEffect, useState } from 'react'

import Button from '@acme/ui/components/button'
import { List, Plus, Trash, GripVertical } from '@acme/ui/components/icon'
import cn from '@acme/ui/utils/cn'

import { AutoFieldPrivate, type FieldPropsInternal } from '../'
import { reorder, replace } from '../../../lib'
import { Droppable } from '../../Droppable'
import { Draggable } from '../../Draggable'
import type { ArrayState, ItemWithId } from '../../../types/Config'
import { useAppContext } from '../../Puck/context'
import { DragDropContext } from '../../DragDropContext'

export const ArrayField = ({
  field,
  onChange,
  value: _value,
  name,
  label,
  readOnly,
  id,
  Label = (props) => <div {...props} />,
}: FieldPropsInternal) => {
  const { state, setUi, selectedItem } = useAppContext()

  const readOnlyFields = selectedItem?.readOnly || {}

  const value: object[] = _value

  const arrayState = state.ui.arrayState[id] || {
    items: Array.from(value || []).map((/*item,*/ idx) => {
      return {
        _originalIndex: idx,
        _arrayId: `${id}-${idx}`,
      }
    }),
    openId: '',
  }

  const [localState, setLocalState] = useState({ arrayState, value })

  useEffect(() => {
    setLocalState({ arrayState, value })
  }, [value, state.ui.arrayState[id]])

  const mapArrayStateToUi = useCallback(
    (partialArrayState: Partial<ArrayState>) => {
      return {
        arrayState: {
          ...state.ui.arrayState,
          [id]: { ...arrayState, ...partialArrayState },
        },
      }
    },
    [arrayState],
  )

  const getHighestIndex = useCallback(() => {
    return arrayState.items.reduce(
      // @ts-ignore
      (acc, item) => (item._originalIndex > acc ? item._originalIndex : acc),
      -1,
    )
  }, [arrayState])

  const regenerateArrayState = useCallback(
    // @ts-ignore
    (value) => {
      let highestIndex = getHighestIndex()

      const newItems = Array.from(value || []).map((item, idx) => {
        const arrayStateItem = arrayState.items[idx]

        const newItem = {
          _originalIndex:
            typeof arrayStateItem?._originalIndex !== 'undefined'
              ? arrayStateItem._originalIndex
              : // @ts-ignore
                highestIndex + 1,
          _arrayId:
            // @ts-ignore
            arrayState.items[idx]?._arrayId || `${id}-${highestIndex + 1}`,
        }

        if (newItem._originalIndex > highestIndex) {
          highestIndex = newItem._originalIndex
        }

        return newItem
      })

      // We don't need to record history during this useEffect, as the history has already been set by onDragEnd
      return { ...arrayState, items: newItems }
    },
    [arrayState],
  )

  // Create a mirror of value with IDs added for drag and drop
  useEffect(() => {
    if (arrayState.items.length > 0) {
      // @ts-ignore
      setUi(mapArrayStateToUi(arrayState))
    }
  }, [])

  const [hovering, setHovering] = useState(false)

  if (field.type !== 'array' || !field.arrayFields) {
    return null
  }

  const addDisabled =
    (field.max !== undefined &&
      localState.arrayState.items.length >= field.max) ||
    readOnly

  return (
    <Label
      el='div'
      icon={<List className='size-4' />}
      label={label || name}
      readOnly={readOnly}
    >
      <DragDropContext
        onDragEnd={(event) => {
          if (event.destination) {
            const newValue = reorder(
              value,
              event.source.index,
              event.destination?.index,
            )

            const newArrayStateItems: ItemWithId[] = reorder(
              arrayState.items,
              event.source.index,
              event.destination?.index,
            )

            onChange(newValue, {
              arrayState: {
                ...state.ui.arrayState,
                [id]: { ...arrayState, items: newArrayStateItems },
              },
            })

            setLocalState({
              value: newValue,
              arrayState: { ...arrayState, items: newArrayStateItems },
            })
          }
        }}
      >
        <Droppable droppableId='array' isDropDisabled={readOnly}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                className='divide-y rounded-sm bg-secondary'
                // className={getClassName({
                //   isDraggingFrom: !!snapshot.draggingFromThisWith,
                //   hasItems: Array.isArray(value) && value.length > 0,
                //   addDisabled,
                // })}
                onMouseOver={(e) => {
                  e.stopPropagation()
                  setHovering(true)
                }}
                onMouseOut={(e) => {
                  e.stopPropagation()
                  setHovering(false)
                }}
                ref={provided.innerRef}
              >
                {localState.arrayState.items.map((item, i) => {
                  const { _arrayId = `${id}-${i}`, _originalIndex = i } = item
                  const data = Array.from(localState.value || [])[i] || {}

                  return (
                    <Draggable
                      className={(_, snapshot) =>
                        cn(
                          arrayState.openId === _arrayId &&
                            '[&>fieldset]:block',
                        )
                      }
                      id={_arrayId}
                      index={i}
                      isDragDisabled={readOnly || !hovering}
                      key={_arrayId}
                      // className={(_, snapshot) =>
                      //   getClassNameItem({
                      //     isDragging: snapshot?.isDragging,
                      //     isExpanded: arrayState.openId === _arrayId,
                      //     readOnly,
                      //   })
                      // }
                    >
                      {() => (
                        <>
                          <div
                            className='group flex h-12 items-center justify-between px-4 text-sm'
                            onClick={() => {
                              if (arrayState.openId === _arrayId) {
                                setUi(
                                  // @ts-ignore
                                  mapArrayStateToUi({
                                    openId: '',
                                  }),
                                )
                              } else {
                                setUi(
                                  // @ts-ignore
                                  mapArrayStateToUi({
                                    openId: _arrayId,
                                  }),
                                )
                              }
                            }}
                          >
                            {field.getItemSummary
                              ? field.getItemSummary(data, i)
                              : `Item #${_originalIndex}`}
                            <div className='flex items-center space-x-1'>
                              {!readOnly && (
                                <Button
                                  className='hidden px-1.5 group-hover:inline-flex'
                                  disabled={
                                    field.min !== undefined &&
                                    field.min >=
                                      localState.arrayState.items.length
                                  }
                                  onClick={(e) => {
                                    e.stopPropagation()

                                    const existingValue = [...(value || [])]

                                    const existingItems = [
                                      ...(arrayState.items || []),
                                    ]

                                    existingValue.splice(i, 1)
                                    existingItems.splice(i, 1)

                                    onChange(
                                      existingValue,
                                      // @ts-ignore
                                      mapArrayStateToUi({
                                        // @ts-ignore
                                        items: existingItems,
                                      }),
                                    )
                                  }}
                                  size='sm'
                                  variant='ghost'
                                >
                                  <Trash className='size-4' />
                                </Button>
                              )}

                              <GripVertical className='size-4 cursor-grab text-muted-foreground' />
                            </div>
                          </div>

                          <fieldset className='hidden'>
                            {Object.keys(field.arrayFields).map((fieldName) => {
                              const subField = field.arrayFields?.[fieldName]

                              const subFieldName = `${name}[${i}].${fieldName}`
                              const wildcardFieldName = `${name}[*].${fieldName}`

                              return (
                                <AutoFieldPrivate
                                  id={`${_arrayId}_${fieldName}`}
                                  // @ts-ignore
                                  field={subField}
                                  key={subFieldName}
                                  // @ts-ignore
                                  label={subField.label || fieldName}
                                  name={subFieldName}
                                  onChange={(val, ui) => {
                                    onChange(
                                      replace(value, i, {
                                        ...data,
                                        [fieldName]: val,
                                      }),
                                      ui,
                                    )
                                  }}
                                  readOnly={
                                    typeof readOnlyFields[subFieldName] !==
                                    'undefined'
                                      ? readOnlyFields[subFieldName]
                                      : readOnlyFields[wildcardFieldName]
                                  }
                                  // @ts-ignore
                                  value={data[fieldName]}
                                />
                              )
                            })}
                          </fieldset>
                        </>
                      )}
                    </Draggable>
                  )
                })}

                {provided.placeholder}

                {!addDisabled && (
                  <button
                    className='flex h-10 w-full items-center justify-center'
                    onClick={() => {
                      const existingValue = value || []

                      const newValue = [
                        ...existingValue,
                        field.defaultItemProps || {},
                      ]

                      const newArrayState = regenerateArrayState(newValue)

                      // @ts-ignore
                      onChange(newValue, mapArrayStateToUi(newArrayState))
                    }}
                    type='button'
                  >
                    <Plus className='size-5' />
                  </button>
                )}
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
    </Label>
  )
}

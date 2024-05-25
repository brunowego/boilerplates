import {
  type CSSProperties,
  type ReactNode,
  type SyntheticEvent,
  useEffect,
  useState,
} from 'react'
import { Draggable } from '@measured/dnd'

import { Copy, Trash, Loader2 } from '@acme/ui/components/icon'
import cn from '@acme/ui/utils/cn'

import { useModifierHeld } from '../../lib/use-modifier-held'
import { isIos } from '../../lib/is-ios'
import { useAppContext } from '../Puck/context'
import { DefaultDraggable } from '../Draggable'

import styles from './styles.module.css'
import getClassNameFactory from '../../lib/get-class-name-factory'
const getClassName = getClassNameFactory('DraggableComponent', styles)

// Magic numbers are used to position actions overlay 8px from top of component, bottom of component (when sticky scrolling) and side of preview
const space = 8
const actionsOverlayTop = space * 6.5
const actionsTop = -(actionsOverlayTop - 8)
const actionsRight = space

type DraggableComponentProps = {
  children: ReactNode
  id: string
  index: number
  isSelected?: boolean
  onClick?: (e: SyntheticEvent) => void
  onMount?: () => void
  onMouseDown?: (e: SyntheticEvent) => void
  onMouseUp?: (e: SyntheticEvent) => void
  onMouseOver?: (e: SyntheticEvent) => void
  onMouseOut?: (e: SyntheticEvent) => void
  onDelete?: (e: SyntheticEvent) => void
  onDuplicate?: (e: SyntheticEvent) => void
  debug?: string
  label?: string
  isLocked: boolean
  isLoading: boolean
  isDragDisabled?: boolean
  forceHover?: boolean
  indicativeHover?: boolean
  style?: CSSProperties
}

export const DraggableComponent = ({
  children,
  id,
  index,
  isLoading = false,
  isSelected = false,
  onClick = () => null,
  onMount = () => null,
  onMouseDown = () => null,
  onMouseUp = () => null,
  onMouseOver = () => null,
  onMouseOut = () => null,
  onDelete = () => null,
  onDuplicate = () => null,
  debug,
  label,
  isLocked = false,
  isDragDisabled,
  forceHover = false,
  indicativeHover = false,
  style,
}: DraggableComponentProps) => {
  const { zoomConfig } = useAppContext()
  const isModifierHeld = useModifierHeld('Alt')

  const { status } = useAppContext()

  const El = status !== 'LOADING' ? Draggable : DefaultDraggable

  useEffect(onMount, [])

  const [disableSecondaryAnimation, setDisableSecondaryAnimation] =
    useState(false)

  useEffect(() => {
    // Disable animations on iOS to prevent GPU memory crashes
    if (isIos()) {
      setDisableSecondaryAnimation(true)
    }
  }, [])

  return (
    <El
      key={id}
      draggableId={id}
      index={index}
      isDragDisabled={isDragDisabled}
      disableSecondaryAnimation={disableSecondaryAnimation}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            'group',
            getClassName({
              isSelected,
              isModifierHeld,
              isDragging: snapshot.isDragging,
              isLocked,
              forceHover,
              indicativeHover,
            }),
          )}
          style={{
            ...style,
            ...provided.draggableProps.style,
            cursor: isModifierHeld ? 'initial' : 'grab',
          }}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onClick={onClick}
        >
          {debug}

          {isLoading && <Loader2 className='size-4 animate-spin' />}

          <div
            className={getClassName('actionsOverlay')}
            style={{
              top: actionsOverlayTop / zoomConfig.zoom,
            }}
          >
            <div
              className={cn(
                'absolute z-10 hidden h-10 cursor-grab gap-x-1 rounded-md bg-primary p-1 text-primary-foreground',
                getClassName('actions'),
              )}
              style={{
                transform: `scale(${1 / zoomConfig.zoom}`,
                top: actionsTop / zoomConfig.zoom,
                right: actionsRight / zoomConfig.zoom,
              }}
            >
              {label && (
                <div className='self-center px-2 font-medium text-sm'>
                  {label}
                </div>
              )}

              <div className='mx-1 h-full w-px bg-neutral-600' />

              <button
                className='px-2 hover:text-blue-300'
                onClick={onDuplicate}
                type='button'
              >
                <Copy className='size-4' />
              </button>

              <button
                className='px-2 hover:text-blue-300'
                onClick={onDelete}
                type='button'
              >
                <Trash className='size-4' />
              </button>
            </div>
          </div>

          <div
            className={cn(
              'pointer-events-none absolute top-0 box-border h-full w-full outline outline-transparent',
              isSelected
                ? 'outline-indigo-400'
                : 'group-hover:outline-indigo-200',
            )}
          />

          <div className='pointer-events-none relative'>{children}</div>
        </div>
      )}
    </El>
  )
}

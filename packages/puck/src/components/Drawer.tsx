import {
  createContext,
  type ReactNode,
  type JSX,
  type ReactElement,
  useContext,
  useMemo,
} from 'react'

import type Icon from '@acme/ui/components/icon'
import DynamicIcon from '@acme/ui/components/dynamic-icon'

import { Droppable } from './Droppable'
import { Draggable } from './Draggable'

const drawerContext = createContext<{ droppableId: string }>({
  droppableId: '',
})

type DrawerDraggableProps = {
  id: string
  index: number
  children: ReactNode
}

const DrawerDraggable = ({
  id,
  index,
  children,
}: DrawerDraggableProps): JSX.Element => (
  <Draggable disableAnimations id={id} index={index} key={id} showShadow>
    {() => children}
  </Draggable>
)

type DrawerItemProps = {
  children?: (props: { children: ReactNode; name: string }) => ReactElement
  id?: string
  icon: keyof typeof Icon
  name: string
  label?: string
  index: number
}

const DrawerItem = ({
  children,
  id,
  name,
  icon,
  label,
  index,
}: DrawerItemProps): JSX.Element | null => {
  const ctx = useContext(drawerContext)
  const resolvedId = `${ctx.droppableId}::${id || name}`

  const CustomInner = useMemo(
    () =>
      children ||
      (({ children /*, name*/ }: { children: ReactNode; name: string }) => (
        <div className='mb-2 flex aspect-square items-center justify-center rounded-sm border bg-secondary shadow-sm hover:border-foreground'>
          {children}
        </div>
      )),
    [children],
  )

  return (
    <div className='text-center'>
      <DrawerDraggable id={resolvedId} index={index}>
        <CustomInner name={name}>
          <DynamicIcon className='size-6 stroke-[1.5]' icon={icon} />
        </CustomInner>
      </DrawerDraggable>

      <span className='truncate'>{label ?? name}</span>
    </div>
  )
}

type DrawerProps = {
  children: ReactNode
  droppableId?: string
  direction?: 'vertical' | 'horizontal'
}

export const Drawer = ({
  children,
  droppableId = 'component-list',
  direction = 'vertical',
}: DrawerProps) => {
  return (
    <drawerContext.Provider value={{ droppableId }}>
      <Droppable droppableId={droppableId} isDropDisabled direction={direction}>
        {(provided /*, snapshot*/) => (
          <div
            {...provided.droppableProps}
            className='mb-2 grid grid-cols-6 gap-x-2 gap-y-4 text-[11px]'
            ref={provided.innerRef}
          >
            {children}

            <span className='sr-only'>{provided.placeholder}</span>
          </div>
        )}
      </Droppable>
    </drawerContext.Provider>
  )
}

Drawer.Item = DrawerItem

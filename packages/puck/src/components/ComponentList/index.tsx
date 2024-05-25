import type { ReactNode } from 'react'

import type { TComponentListItem } from './types'
import { useAppContext } from '../Puck/context'
import { Drawer } from '../Drawer'

type ComponentListItemProps = TComponentListItem & {
  name: string
  index: number
}

const ComponentListItem = ({
  icon,
  name,
  label,
  index,
}: ComponentListItemProps) => {
  const { overrides } = useAppContext()

  return (
    <Drawer.Item icon={icon} index={index} label={label} name={name}>
      {overrides.componentItem}
    </Drawer.Item>
  )
}

type ComponentListProps = {
  id: string
  children?: ReactNode
  title?: string
}

const ComponentList = ({ children, title /*, id*/ }: ComponentListProps) => {
  const { config } = useAppContext()

  return (
    <div className='p-4'>
      {title && (
        <h3 className='mb-4 font-medium text-muted-foreground text-sm'>
          {title}
        </h3>
      )}

      <Drawer droppableId={`component-list${title ? `:${title}` : ''}`}>
        {children ||
          Object.keys(config.components).map((componentKey, index) => {
            return (
              <ComponentListItem
                icon={config.components[componentKey]?.icon ?? 'CheckCircle'}
                index={index}
                key={componentKey}
                label={config.components[componentKey]?.label ?? componentKey}
                name={componentKey}
              />
            )
          })}
      </Drawer>
    </div>
  )
}

ComponentList.Item = ComponentListItem

export { ComponentList }

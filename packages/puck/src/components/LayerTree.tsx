import { useContext } from 'react'

import { ChevronDown, Layers } from '@acme/ui/components/icon'
import type Icon from '@acme/ui/components/icon'
import DynamicIcon from '@acme/ui/components/dynamic-icon'

import type { Config, Data } from '../types/Config'
import type { ItemSelector /*, getItem*/ } from '../lib/get-item'
import { scrollIntoView } from '../lib/scroll-into-view'
import { rootDroppableId } from '../lib/root-droppable-id'
import { dropZoneContext } from './DropZone/context'
import { findZonesForArea } from '../lib/find-zones-for-area'
import { getZoneId } from '../lib/get-zone-id'
// import { isChildOfZone } from '../lib/is-child-of-zone'
import { getFrame } from '../lib/get-frame'

type LayerTreeProps = {
  data: Data
  config: Config
  zoneContent: Data['content']
  itemSelector?: ItemSelector | null
  setItemSelector: (item: ItemSelector | null) => void
  zone?: string
  label?: string
}

export const LayerTree = ({
  data,
  config,
  zoneContent,
  itemSelector,
  setItemSelector,
  zone,
  label,
}: LayerTreeProps) => {
  const zones = data.zones || {}
  const ctx = useContext(dropZoneContext)

  return (
    <>
      {label && (
        <div className='flex items-center gap-x-2'>
          <Layers size='16' />
          {label}
        </div>
      )}

      {zoneContent.length === 0 ? (
        <p className='text-center text-muted-foreground text-sm leading-10'>
          No items
        </p>
      ) : (
        <>
          {zoneContent.map((item, i) => {
            const isSelected =
              itemSelector?.index === i &&
              (itemSelector.zone === zone ||
                (itemSelector.zone === rootDroppableId && !zone))

            const zonesForItem = findZonesForArea(data, item.props.id)
            const containsZone = Object.keys(zonesForItem).length > 0

            const {
              setHoveringArea = () => {},
              setHoveringComponent = () => {},
              // hoveringComponent,
            } = ctx || {}

            // const selectedItem =
            //   itemSelector && data ? getItem(itemSelector, data) : null

            // const isHovering = hoveringComponent === item.props.id

            // const childIsSelected = isChildOfZone(item, selectedItem, ctx)

            return (
              <div
                className='grid'
                // className={getClassNameLayer({
                //   isSelected,
                //   isHovering,
                //   containsZone,
                //   childIsSelected,
                // })}
                key={`${item.props.id}_${i}`}
              >
                <button
                  className='-mx-3 flex items-center gap-x-2 rounded-sm px-3 leading-10 hover:bg-secondary'
                  onClick={() => {
                    if (isSelected) {
                      setItemSelector(null)

                      return
                    }

                    setItemSelector({
                      index: i,
                      zone,
                    })

                    const id = zoneContent[i]?.props.id

                    const frame = getFrame()

                    scrollIntoView(
                      frame?.querySelector(
                        `[data-rfd-drag-handle-draggable-id="draggable-${id}"]`,
                      ) as HTMLElement,
                    )
                  }}
                  onMouseOver={(e) => {
                    e.stopPropagation()
                    setHoveringArea(item.props.id)
                    setHoveringComponent(item.props.id)
                  }}
                  onMouseOut={(e) => {
                    e.stopPropagation()
                    setHoveringArea(null)
                    setHoveringComponent(null)
                  }}
                  type='button'
                >
                  <DynamicIcon
                    className='size-4 stroke-[1.5]'
                    icon={
                      config.components[item.type]?.icon as keyof typeof Icon
                    }
                  />

                  <span>
                    {config.components[item.type]?.label ?? item.type}
                  </span>

                  {containsZone && <ChevronDown className='ml-auto size-4' />}
                </button>

                {containsZone &&
                  Object.keys(zonesForItem).map((zoneKey, index) => (
                    <LayerTree
                      className='hidden'
                      config={config}
                      data={data}
                      itemSelector={itemSelector}
                      // biome-ignore lint/suspicious/noArrayIndexKey:
                      key={index}
                      label={getZoneId(zoneKey)[1]}
                      setItemSelector={setItemSelector}
                      zone={zoneKey}
                      // @ts-ignore
                      zoneContent={zones[zoneKey]}
                    />
                  ))}
              </div>
            )
          })}
        </>
      )}
    </>
  )
}

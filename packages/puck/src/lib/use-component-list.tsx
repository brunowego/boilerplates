import { type ReactNode, useState, useEffect } from 'react'

import type { Config, UiState } from '../types/Config'
import { ComponentList } from '../components/ComponentList'
import type { TComponentListItem } from '../components/ComponentList/types'

export const useComponentList = (config: Config, ui: UiState) => {
  const [componentList, setComponentList] = useState<ReactNode[]>()

  useEffect(() => {
    if (Object.keys(ui.componentList).length > 0) {
      const matchedComponents: string[] = []

      let _componentList: ReactNode[]

      _componentList = Object.entries(ui.componentList).map(
        ([categoryKey, category]) => {
          if (category.visible === false || !category.components) {
            return null
          }

          return (
            <ComponentList
              id={categoryKey}
              key={categoryKey}
              title={category.title || categoryKey}
            >
              {category.components.map((componentName, index) => {
                matchedComponents.push(componentName as string)

                const componentConf =
                  config.components[componentName] || ({} as TComponentListItem)

                return (
                  <ComponentList.Item
                    icon={
                      (componentConf.icon ??
                        componentName) as TComponentListItem['icon']
                    }
                    index={index}
                    key={componentName}
                    label={(componentConf.label ?? componentName) as string}
                    name={componentName as string}
                  />
                )
              })}
            </ComponentList>
          )
        },
      )

      const remainingComponents = Object.keys(config.components).filter(
        (component) => matchedComponents.indexOf(component) === -1,
      )

      if (
        remainingComponents.length > 0 &&
        !ui.componentList.other?.components &&
        ui.componentList.other?.visible !== false
      ) {
        _componentList.push(
          <ComponentList
            id='other'
            key='other'
            title={ui.componentList.other?.title || 'Other'}
          >
            {remainingComponents.map((componentName, index) => {
              const componentConf =
                config.components[componentName] || ({} as TComponentListItem)

              return (
                <ComponentList.Item
                  icon={
                    (componentConf.icon ??
                      componentName) as TComponentListItem['icon']
                  }
                  index={index}
                  key={componentName}
                  label={(componentConf.label ?? componentName) as string}
                  name={componentName as string}
                />
              )
            })}
          </ComponentList>,
        )
      }

      setComponentList(_componentList)
    }
  }, [config.categories, config.components, ui.componentList])

  return componentList
}

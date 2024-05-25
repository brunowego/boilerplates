import './styles/index.css'

export type { PuckAction } from './reducer/actions'

export * from './types/Config'
export * from './types/Fields'

export * from './components/AutoField'
export * from './components/Button'
export { Drawer } from './components/Drawer'

// DEPRECATED
export * from './components/DropZone'
export * from './components/IconButton'
export * from './components/Puck'
export * from './components/Render'
export * from './components/MenuBar'

export * from './lib/migrate'
export * from './lib/transform-props'
export * from './lib/resolve-all-data'
export { usePuck } from './lib/use-puck'

export { FieldLabel } from './components/AutoField'

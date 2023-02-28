import { appFactory } from './factory'

export const appData = Array.from({ length: 5 }, () => appFactory.build({}))

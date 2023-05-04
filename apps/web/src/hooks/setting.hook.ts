import { createContext, useContext } from 'react'
import settingService from '../services/setting.service'
import { SettingHook } from '../types/setting.type'

export const SettingContext = createContext<SettingHook>({
  settingVariables: [],
  refresh: async () => {},
})

const useSetting = () => {
  const settingContext = useContext(SettingContext)

  return {
    get: (key: string) => settingService.get(key, settingContext.settingVariables),
    refresh: async () => settingContext.refresh(),
  }
}

export default useSetting

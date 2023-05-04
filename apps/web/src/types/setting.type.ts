type Setting = {
  key: string
  defaultValue: string
  value: string
  type: string
}

export type UpdateSetting = {
  key: string
  value: string
}

export type AdminSetting = Setting & {
  name: string
  updatedAt: Date
  secret: boolean
  description: string
  obscured: boolean
}

export type AdminSettingGroupedByCategory = {
  [key: string]: [
    Setting & {
      updatedAt: Date
      secret: boolean
      description: string
      obscured: boolean
      category: string
    }
  ]
}

export type SettingVariablesCategory = {
  category: string
  count: number
}

export type SettingHook = {
  settingVariables: Setting[]
  refresh: () => void
}

export default Setting

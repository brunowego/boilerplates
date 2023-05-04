// import axios from 'axios'
import Setting, { AdminSetting, UpdateSetting } from '../types/setting.type'
import api from './api.service'

const list = async (): Promise<Setting[]> => {
  return (await api.get('/settings')).data
}

const getByCategory = async (category: string): Promise<AdminSetting[]> => {
  return (await api.get(`/settings/admin/${category}`)).data
}

const updateMany = async (data: UpdateSetting[]): Promise<AdminSetting[]> => {
  return (await api.patch('/settings/admin', data)).data
}

const get = (key: string, settingVariables: Setting[]): any => {
  if (!settingVariables) return null

  const settingVariable = settingVariables.filter((variable) => variable.key == key)[0]

  if (!settingVariable) throw new Error(`Setting variable ${key} not found`)

  const value = settingVariable.value ?? settingVariable.defaultValue

  if (settingVariable.type == 'number') return parseInt(value)

  if (settingVariable.type == 'boolean') return value == 'true'

  if (settingVariable.type == 'string' || settingVariable.type == 'text') return value
}

const finishSetup = async (): Promise<AdminSetting[]> => {
  return (await api.post('/settings/admin/finishSetup')).data
}

const sendTestEmail = async (email: string) => {
  await api.post('/settings/admin/testEmail', { email })
}

// const isNewReleaseAvailable = async () => {
//   const response = (
//     await axios.get('https://api.github.com/repos/brunowego/boilerplates/releases/latest')
//   ).data

//   return response.tag_name.replace('v', '') != process.env.VERSION
// }

const changeLogo = async (file: File) => {
  const form = new FormData()

  form.append('file', file)

  await api.post('/settings/admin/logo', form)
}

export default {
  list,
  getByCategory,
  updateMany,
  get,
  finishSetup,
  sendTestEmail,
  // isNewReleaseAvailable,
  changeLogo,
}

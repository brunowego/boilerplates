import type { JSX } from 'react'

export default async function SettingsPage(): Promise<JSX.Element> {
  return (
    <div className='flex justify-between items-center'>
      <h2 className='text-3xl font-bold tracking-tight leading-10'>Settings</h2>
    </div>
  )
}

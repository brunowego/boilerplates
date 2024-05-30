import type { JSX } from 'react'

import cn from '@acme/ui/utils/cn'
import { Lock } from '@acme/ui/components/icon'

import { Panels, type Panel } from '@/components/panels'
import {
  SidePanel,
  SidePanelContent,
  SidePanelHeader,
  SidePanelTitle,
} from '@/components/side-panel'
import useSidePanel from '@/store/use-side-panel'

export const settings = [
  {
    panel: Panels.PAGE_ADDRESS,
    title: 'Page address',
  },
  {
    panel: Panels.SEO,
    title: 'Site information (SEO)',
  },
  {
    title: 'Chat support',
    locked: true,
  },
  {
    panel: Panels.FACEBOOK_INTEGRATION,
    title: 'Facebook integration',
  },
  {
    title: 'Scripts',
    locked: true,
  },
  {
    panel: Panels.URL_PARAMETERS,
    title: 'URL parameters',
  },
] as { panel: Panel; title: string; locked?: boolean }[]

export default function Settings(): JSX.Element {
  const { open } = useSidePanel()

  return (
    <SidePanel>
      <SidePanelHeader>
        <SidePanelTitle>Settings</SidePanelTitle>
      </SidePanelHeader>

      <SidePanelContent>
        <nav className='-mt-2 mb-2 flex flex-col space-y-1'>
          {settings.map(({ panel, title, locked }, index) => (
            <button
              className={cn(
                '-mx-3 rounded-sm px-3 text-start leading-10',
                locked
                  ? 'flex items-center justify-between text-muted-foreground'
                  : 'hover:bg-secondary',
              )}
              disabled={locked}
              // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
              key={index}
              onClick={() => open(panel)}
              type='button'
            >
              <span>{title}</span>

              {locked ? <Lock className='size-4' /> : null}
            </button>
          ))}
        </nav>
      </SidePanelContent>
    </SidePanel>
  )
}

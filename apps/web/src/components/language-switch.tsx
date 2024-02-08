'use client'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icons,
} from '@acme/ui'

import { dynamicActivate } from '@/app/providers/lingui'

const languages = {
  en: t`English`,
  pt: t`Portuguese`,
}

export const LanguageSwitch = () => {
  const { i18n } = useLingui()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icons.languages className='w-5 h-5' />

        <span className='sr-only'>{t`Language Switch`}</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {Object.keys(languages).map((lang, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
          <DropdownMenuItem key={index} onClick={() => dynamicActivate(lang)}>
            {i18n._(languages[lang as keyof typeof languages])}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

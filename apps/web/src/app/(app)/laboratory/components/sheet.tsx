'use client'

import type { JSX } from 'react'

import { sheetVariants } from '@acme/ui/components/sheet'
import Avatar from '@acme/ui/components/avatar'
import Tabs from '@acme/ui/components/tabs'

export default function _Sheet(): JSX.Element {
  return (
    <>
      <div className='data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-background/80 data-[state=closed]:animate-out data-[state=open]:animate-in' />

      <div className={sheetVariants({ className: '!p-0 sm:max-w-xl' })}>
        <div className='flex gap-4 p-4 lg:px-5'>
          <Avatar className='size-20'>
            <Avatar.Image src='data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%20fill%3D%22none%22%20shape-rendering%3D%22auto%22%3E%3Cmetadata%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Adcterms%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%22%3E%3Crdf%3ARDF%3E%3Crdf%3ADescription%3E%3Cdc%3Atitle%3EThumbs%3C%2Fdc%3Atitle%3E%3Cdc%3Acreator%3EDiceBear%3C%2Fdc%3Acreator%3E%3Cdc%3Asource%20xsi%3Atype%3D%22dcterms%3AURI%22%3Ehttps%3A%2F%2Fwww.dicebear.com%3C%2Fdc%3Asource%3E%3Cdcterms%3Alicense%20xsi%3Atype%3D%22dcterms%3AURI%22%3Ehttps%3A%2F%2Fcreativecommons.org%2Fpublicdomain%2Fzero%2F1.0%2F%3C%2Fdcterms%3Alicense%3E%3Cdc%3Arights%3E%E2%80%9EThumbs%E2%80%9D%20(https%3A%2F%2Fwww.dicebear.com)%20by%20%E2%80%9EDiceBear%E2%80%9D%2C%20licensed%20under%20%E2%80%9ECC0%201.0%E2%80%9D%20(https%3A%2F%2Fcreativecommons.org%2Fpublicdomain%2Fzero%2F1.0%2F)%3C%2Fdc%3Arights%3E%3C%2Frdf%3ADescription%3E%3C%2Frdf%3ARDF%3E%3C%2Fmetadata%3E%3Cmask%20id%3D%22viewboxMask%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20rx%3D%220%22%20ry%3D%220%22%20x%3D%220%22%20y%3D%220%22%20fill%3D%22%23fff%22%20%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23viewboxMask)%22%3E%3Crect%20fill%3D%22%23f88c49%22%20width%3D%22100%22%20height%3D%22100%22%20x%3D%220%22%20y%3D%220%22%20%2F%3E%3Cg%20transform%3D%22translate(-5%2C%20-4)%20rotate(-2%2050%2070)%22%3E%3Cpath%20d%3D%22M95%2053.33C95%2029.4%2074.85%2010%2050%2010S5%2029.4%205%2053.33V140h90V53.33Z%22%20fill%3D%22%230a5b83%22%2F%3E%3Cg%20transform%3D%22translate(29%2033)%22%3E%3Cg%20transform%3D%22translate(4%2C%20-5)%20rotate(6%2021%2021)%22%3E%3Cg%20transform%3D%22translate(0%205)%22%3E%3Cpath%20d%3D%22M11.86%207.5c0-1.42-4.14-2.85-4.82-4.98C6.34.4%2016%205.37%2016%207.5c0%202.13-9.65%207.11-8.96%204.98.68-2.13%204.82-3.56%204.82-4.98ZM30.14%207.5c0-1.42%204.14-2.85%204.82-4.98C35.66.4%2026%205.37%2026%207.5c0%202.13%209.65%207.11%208.96%204.98-.68-2.13-4.82-3.56-4.82-4.98Z%22%20fill%3D%22%23ffffff%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(6%2023)%22%3E%3Cpath%20d%3D%22M15%2014C1.9%2014-.72%201.29.15.23%201.03-.83%206.27%202.11%2015%202.11S28.97-.83%2029.85.23C30.72%201.3%2028.1%2014%2015%2014Z%22%20fill%3D%22%23ffffff%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E' />

            <Avatar.Fallback />
          </Avatar>

          <div className='space-y-1'>
            <span className='text-muted-foreground'>Book</span>

            <h1 className='font-medium'>
              Sapiens: A Brief History of Humankind
            </h1>
          </div>
        </div>

        <Tabs defaultValue='account'>
          <Tabs.List>
            <Tabs.Trigger value='account'>General</Tabs.Trigger>

            <Tabs.Trigger value='password'>Preferences</Tabs.Trigger>
          </Tabs.List>

          {/* <Button className='absolute top-1 right-1' variant='ghost'>
            Edit
          </Button> */}

          <Tabs.Content value='account'>
            Make changes to your account here.
          </Tabs.Content>

          <Tabs.Content value='password'>
            Change your password here.
          </Tabs.Content>
        </Tabs>
      </div>
    </>
  )
}

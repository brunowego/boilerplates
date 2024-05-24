'use client'

import type { JSX } from 'react'

import Puck, { type Data, config } from '@/lib/puck'
import '@measured/puck/puck.css'

import CustomPuck from './custom-puck'
import { Drawer } from '@measured/puck'

export default function Editor(): JSX.Element {
  const handleSave = async (data: Data) => {
    try {
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Puck
      config={config}
      // @ts-ignore
      data={{
        content: [],
        root: {},
        zones: {},
      }}
      overrides={{
        components: () => {
          return (
            <Drawer>
              {config.categories
                ? Object.entries(config.categories).map((category) => (
                    <div className='p-4 lg:px-5'>
                      {/* <pre>{JSON.stringify(category, null, 2)}</pre> */}

                      <h3 className='mb-4 font-medium text-muted-foreground text-sm'>
                        {category[1].title}
                      </h3>

                      <div className='mb-2 grid grid-cols-4 gap-x-2 gap-y-4 text-[11px]'>
                        {category[1].components?.map((component, index) => (
                          // <button key={component} type='button'>
                          //   <div className='mb-2 flex aspect-square items-center justify-center rounded-sm border bg-secondary shadow-sm'>
                          //     {/* <DynamicIcon className='size-7 stroke-[1.5]' icon={icon} /> */}
                          //   </div>

                          //   <span>{component}</span>
                          // </button>
                          <Drawer.Item
                            key={component}
                            index={index}
                            name={component}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                : null}
            </Drawer>
          )
        },
        puck: () => <CustomPuck onPublish={handleSave} />,
      }}
    />
  )
}

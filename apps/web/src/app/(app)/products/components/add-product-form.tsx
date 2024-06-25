'use client'

import type { JSX } from 'react'
import Link from 'next/link'

import Page from '@acme/ui/components/page'
import Label from '@acme/ui/components/label'
import Input from '@acme/ui/components/input'
import { LogOut, CloudUpload } from '@acme/ui/components/icon'
import Textarea from '@acme/ui/components/textarea'
import Button, { buttonVariants } from '@acme/ui/components/button'
import Select from '@acme/ui/components/select'

export default function AddProductForm(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Link
          className={buttonVariants({
            className: 'absolute mt-3',
            size: 'icon',
            variant: 'secondary',
          })}
          href='/products/select'
        >
          <LogOut className='size-4 scale-x-[-1]' />

          <span className='sr-only'>Voltar</span>
        </Link>
      </Page.Header>

      <div className='-z-10 absolute top-0 right-0 h-[300px] w-full bg-white dark:bg-[#0f0f0f]' />

      <Page.Content className='relative'>
        <div className='mx-auto max-w-xl space-y-6'>
          <h1 className='my-20 text-2xl leading-normal'>Infoproduto</h1>
        </div>

        <div className='-z-10 absolute top-0 right-0 h-[300px] w-full bg-white dark:bg-[#0f0f0f]' />

        <div className='mx-auto max-w-xl space-y-6'>
          <div className='-mx-2 relative'>
            <label
              htmlFor='dropzone-file'
              className='flex h-64 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed bg-secondary'
            >
              <div className='space-y-4 text-center'>
                <CloudUpload className='inline-block size-10' />

                <div className='space-y-2'>
                  <p className='text-sm'>
                    <span className='font-semibold'>Click to upload</span> or
                    drag and drop
                  </p>

                  <p className='text-muted-foreground text-xs'>
                    PNG, JPG or WebP (max. 800x400px)
                  </p>
                </div>
              </div>

              <input id='dropzone-file' type='file' className='hidden' />
            </label>
          </div>

          <div className='space-y-2'>
            <Label>Título do produto</Label>

            <div className='-mx-2 relative'>
              <Input
                className='h-12'
                placeholder='Óculus de sol, Camiseta azul, etc'
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-x-10'>
            <div className='grid grid-cols-5 gap-x-6'>
              <div className='col-span-3 space-y-2'>
                <Label>Preço</Label>

                <div className='-mx-2 relative'>
                  <Input className='h-12' placeholder='R$' />
                </div>
              </div>

              <div className='col-span-2 space-y-2'>
                <Label>Desconto</Label>

                <div className='-mx-2 relative'>
                  <Input className='h-12 text-right' placeholder='%' />
                </div>
              </div>
            </div>

            <div className='space-y-2'>
              <Label>Categoria</Label>

              <div className='-mx-2 relative'>
                <Select>
                  <Select.Trigger className='h-12'>
                    <Select.Value placeholder='Theme' />
                  </Select.Trigger>

                  <Select.Content>
                    <Select.Item value='light'>Light</Select.Item>
                  </Select.Content>
                </Select>
              </div>
            </div>
          </div>

          {/* <div className='grid grid-cols-2 gap-x-10'>
            <div className='space-y-2'>
              <Label>Estoque</Label>

              <div className='-mx-2 relative'>
                <Input className='h-12' placeholder='0 un' />
              </div>
            </div>

            <div className='space-y-2'>
              <Label>Código SKU / PDV</Label>

              <div className='-mx-2 relative'>
                <Input
                  className='h-12'
                  defaultValue='LGP3244'
                  placeholder='ABC1234'
                />

                <button className='absolute inset-y-1 right-4' type='button'>
                  <RotateCw className='size-5' />
                </button>
              </div>
            </div>
          </div> */}

          <div className='space-y-2'>
            <Label>
              Descrição <span className='ml-auto font-normal'>0/250</span>
            </Label>

            <div className='-mx-2 relative'>
              <Textarea
                className='h-12'
                placeholder='Use-a para destacar os pontos fortes do seu produto.'
              />
            </div>
          </div>
        </div>
      </Page.Content>

      <Page.Footer>
        <div className='mx-auto max-w-xl'>
          <Button className='!rounded-full w-full' size='lg'>
            Salvar
          </Button>
        </div>
      </Page.Footer>
    </Page>
  )
}

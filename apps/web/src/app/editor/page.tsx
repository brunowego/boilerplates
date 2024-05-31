import type { JSX } from 'react'
import Link from 'next/link'

import { Page, PageContent, PageHeader } from '@acme/ui/components/page'
import { typographyVariants } from '@acme/ui/components/typography'
import Button from '@acme/ui/components/button'
import {
  MoveLeft,
  Monitor,
  Tablet,
  Undo,
  Redo,
  Check,
} from '@acme/ui/components/icon'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@acme/ui/components/modal'

import {
  User,
  CreditCard as CreditCardIcon,
  Calendar,
  AtSign,
  Globe,
} from '@acme/ui/components/icon'
import Input from '@acme/ui/components/input'
import Label from '@acme/ui/components/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@acme/ui/components/select'

export default function EditorPage(): JSX.Element {
  return (
    <Page>
      <PageHeader className='justify-between'>
        <div className='flex items-center space-x-4'>
          <Button size='icon' variant='secondary'>
            <MoveLeft className='size-4' />

            <span className='sr-only'>Back</span>
          </Button>

          <div className='flex items-center space-x-2'>
            <h1
              className={typographyVariants({
                className: 'leading-8',
              })}
            >
              Home page
            </h1>
          </div>
        </div>

        <div className='flex items-center space-x-1'>
          <Button size='icon' variant='secondary'>
            <Monitor className='size-4' />
          </Button>

          <Button size='icon' variant='ghost'>
            <Tablet className='size-4' />
          </Button>
        </div>

        <div className='flex items-center space-x-4'>
          <Button variant='ghost'>View draft</Button>

          <div className='flex items-center space-x-1'>
            <Button disabled size='icon' variant='ghost'>
              <Undo className='size-4' />
            </Button>

            <Button disabled size='icon' variant='ghost'>
              <Redo className='size-4' />
            </Button>
          </div>

          <span className='flex items-center gap-x-1 text-muted-foreground text-sm'>
            <Check className='size-4' />
            Saved changes
          </span>

          <Button variant='secondary'>Publish</Button>
        </div>
      </PageHeader>

      <PageContent>
        {/* <Modal open={true}>
          <ModalTrigger>Open</ModalTrigger>

          <ModalContent className='grid grid-cols-2 p-0'>
            <div className='p-8'>
              <ModalHeader>
                <ModalTitle className='text-2xl'>
                  Are you sure you want to cancel?
                </ModalTitle>

                <ModalDescription>
                  You will lose access to all of our time-saving Canva Pro
                  features:
                </ModalDescription>
              </ModalHeader>

              <ul>
                <li>
                  Free access to the 100 million+ premium photos, videos, and
                  elements included with Canva Pro
                </li>

                <li>The professional look you get from Background Remover</li>

                <li>
                  Brand consistency and all your brand fonts, colors, and logos
                  in one place
                </li>

                <li>The time saved with Resize & Magic Switch</li>

                <li>
                  The money saved from getting our entire library of graphics,
                  templates, and fonts at no extra cost
                </li>

                <li>
                  Images with transparent backgrounds that you can use anywhere
                </li>
              </ul>

              <p>We'll remind you 7 days before your trial ends.</p>

              <div className='grid space-y-2'>
                <Button className='bg-[#f1f3f5] text-black'>
                  Remind me later
                </Button>
                <Button className='bg-[#db1c2c]'>Continue cancellation</Button>
              </div>
            </div>

            <div
              className='rounded-r-[inherit]'
              style={{ backgroundImage: 'url("/static/img/bg-king.jpg")' }}
            />
          </ModalContent>
        </Modal> */}

        <Modal>
          <ModalTrigger>Open</ModalTrigger>

          <ModalContent className='grid grid-cols-2 p-0'>
            <div className='p-8'>
              <ModalHeader>
                <ModalTitle className='text-2xl'>
                  Try Acme Pro for free
                </ModalTitle>
              </ModalHeader>

              <ul className='mb-8 space-y-2 text-sm'>
                <li className='flex space-x-2'>
                  <Check className='size-4 shrink-0 text-green-500' />

                  <p>Free 30 day trial, cancel any time</p>
                </li>

                <li className='flex space-x-2'>
                  <Check className='size-4 shrink-0 text-green-500' />

                  <p>We'll remind you before your trial ends</p>
                </li>
              </ul>

              <form className='mb-8 space-y-4'>
                <div className='space-y-2'>
                  <Label>Cardholder name</Label>

                  <div className='relative'>
                    <User className='absolute inset-y-0 left-3 my-auto' />

                    <Input
                      className='h-12 pl-12'
                      placeholder='John Doe'
                      type='text'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label>Card number</Label>

                  <div className='relative'>
                    <CreditCardIcon className='absolute inset-y-0 left-3 my-auto' />

                    <Input
                      className='h-12 pl-12'
                      placeholder='0000 0000 0000 0000'
                      type='text'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-x-3'>
                  <div className='space-y-2'>
                    <Label>Expiry date</Label>

                    <div className='relative'>
                      <Calendar className='absolute inset-y-0 left-3 my-auto' />

                      <Input
                        className='h-12 pl-12'
                        placeholder='MM / YY'
                        type='text'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label>Security code</Label>

                    <div className='relative'>
                      <CreditCardIcon className='absolute inset-y-0 left-3 my-auto' />

                      <Input
                        className='h-12 pl-12'
                        placeholder='CVC'
                        type='text'
                      />
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label>CPF/CNPJ</Label>

                  <Input className='h-12' type='text' />
                </div>

                <hr />

                <div className='space-y-2'>
                  <div className='space-y-2'>
                    <Label>Email address</Label>

                    <div className='relative'>
                      <AtSign className='absolute inset-y-0 left-3 my-auto' />

                      <Input
                        className='h-12 pl-12'
                        placeholder='johndoe@example.com'
                        type='text'
                      />
                    </div>
                  </div>

                  <div>
                    <Label className='sr-only'>Country</Label>

                    <div className='relative'>
                      <Globe className='absolute inset-y-0 left-3 my-auto' />

                      <Select value='brazil'>
                        <SelectTrigger className='h-12 pl-12'>
                          <SelectValue placeholder='Select country' />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value='brazil'>Brazil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </form>

              <p className='mb-8 text-sm leading-6'>
                This transaction will be processed by{' '}
                <Link
                  className='underline underline-offset-4'
                  href='https://ebanx.com/br/termos'
                  rel='noopener'
                  target='_blank'
                >
                  EBANX
                </Link>{' '}
                according to their terms. By continuing you acknowledge and
                accept these terms and conditions. To authorize the card, a
                small amount will be charged and immediately refunded. This site
                is protected by reCAPTCHA and the Google{' '}
                <Link
                  className='underline underline-offset-4'
                  href='https://policies.google.com/privacy'
                  rel='noopener'
                  target='_blank'
                >
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link
                  className='underline underline-offset-4'
                  href='https://policies.google.com/terms'
                  rel='noopener'
                  target='_blank'
                >
                  Terms of Service
                </Link>{' '}
                apply. By continuing, I&nbsp;warrant that this location
                information is accurate.
              </p>

              <table className='mb-4 w-full text-sm leading-7'>
                <tbody>
                  <tr className='text-muted-foreground'>
                    <td>Due June 29, 2024</td>
                    <td className='text-right'>R$ 35</td>
                  </tr>

                  <tr className='font-medium'>
                    <td>
                      Due today{' '}
                      <span className='text-green-300'>(30 days free)</span>
                    </td>
                    <td className='text-right'>R$ 0</td>
                  </tr>
                </tbody>
              </table>

              <Button className='mb-6 w-full' disabled size='lg'>
                Next
              </Button>

              <p className='text-sm leading-6'>
                By continuing, you agree to the{' '}
                <Link className='underline underline-offset-2' href='/'>
                  Terms of Use
                </Link>{' '}
                applicable to Acme Pro and confirm you have read our{' '}
                <Link className='underline underline-offset-2' href='/'>
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div
              className='rounded-r-[inherit] bg-border bg-center bg-contain bg-no-repeat'
              style={{ backgroundImage: 'url("/static/img/bg-modal.png")' }}
            />
          </ModalContent>
        </Modal>
      </PageContent>
    </Page>
  )
}

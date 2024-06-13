'use client'

import type { JSX } from 'react'

import Page from '@acme/ui/components/page'
import Fieldset from '@acme/ui/components/fieldset'
import Card from '@acme/ui/components/card'
import Label from '@acme/ui/components/label'
import Switch from '@acme/ui/components/switch'
import Badge from '@acme/ui/components/badge'
import {
  WalletMinimal,
  CreditCard,
  ShoppingBag,
  Bot,
  Gift,
} from '@acme/ui/components/icon'

import Pix from './pix'
import PayPal from './paypal'
import Revolut from './revolut'
import Wise from './wise'
import MercadoPago from './mercado-pago'
import Crypto from './crypto'
import BankTransfer from './bank-transfer'
import Delivery from './delivery'

export default function Payment(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Payment</Page.Title>
      </Page.Header>

      <Page.Content className='divide-y *:py-5 first:*:pt-0 last:*:pb-0'>
        <Fieldset
          title='Methods'
          description='Customers will choose one of following payment methods to make payment.'
        >
          <Card className='divide-y xl:col-span-4 *:space-y-4'>
            <Card.Content>
              <Pix />
            </Card.Content>

            <Card.Content>
              <PayPal />
            </Card.Content>

            <Card.Content>
              <Revolut />
            </Card.Content>

            <Card.Content>
              <Wise />
            </Card.Content>

            <Card.Content>
              <MercadoPago />
            </Card.Content>

            <Card.Content>
              <Crypto />
            </Card.Content>

            <Card.Content>
              <BankTransfer />
            </Card.Content>

            <Card.Content>
              <div className='flex items-center space-x-4'>
                <Label
                  className='grow space-x-1.5 font-medium'
                  htmlFor='cash-on-delivery'
                >
                  <div className='p-1'>
                    <WalletMinimal className='size-6' />
                  </div>

                  <span className='font-medium text-base'>
                    Cash on delivery
                  </span>
                </Label>

                <Switch id='cash-on-delivery' />
              </div>
            </Card.Content>

            {/* <Card.Content>
              <div className='flex items-center space-x-4'>
                <Label
                  className='grow space-x-1.5 font-medium'
                  htmlFor='store-credit'
                >
                  <div className='p-1'>
                    <CreditCard className='size-6' />
                  </div>

                  <span className='font-medium text-base'>Store credit</span>
                </Label>

                <Switch id='store-credit' />
              </div>
            </Card.Content> */}

            <Card.Content>
              <div className='flex items-center space-x-4'>
                <Label
                  className='grow space-x-1.5 font-medium'
                  htmlFor='card-payments'
                >
                  <div className='p-1'>
                    <CreditCard className='size-6' />
                  </div>

                  <span className='font-medium text-base'>Card payments</span>

                  <Badge className='!rounded-full uppercase'>Premium</Badge>
                </Label>

                <Switch disabled id='card-payments' />
              </div>
            </Card.Content>
          </Card>
        </Fieldset>

        <Fieldset
          title='Advanced features'
          description="Optimize your business's operations."
        >
          <Card className='divide-y xl:col-span-4 *:space-y-4'>
            <Card.Content>
              <Delivery />
            </Card.Content>

            <Card.Content>
              <div className='flex items-center space-x-4'>
                <Label
                  className='grow space-x-1.5 font-medium'
                  htmlFor='self-pick-up'
                >
                  <div className='p-1'>
                    <ShoppingBag className='size-6' />
                  </div>

                  <span className='font-medium text-base'>Self pick-up</span>
                </Label>

                <Switch id='self-pick-up' />
              </div>
            </Card.Content>

            <Card.Content>
              <div className='flex items-center space-x-4'>
                <Label
                  className='grow space-x-1.5 font-medium'
                  htmlFor='whatsapp-bot'
                >
                  <div className='p-1'>
                    <Bot className='size-6' />
                  </div>

                  <span className='font-medium text-base'>
                    WhatsApp bot notification
                  </span>

                  <Badge className='!rounded-full uppercase'>Premium</Badge>
                </Label>

                <Switch disabled id='whatsapp-bot' />
              </div>
            </Card.Content>

            <Card.Content>
              <div className='flex items-center space-x-4'>
                <Label
                  className='grow space-x-1.5 font-medium'
                  htmlFor='loyalty-rewards'
                >
                  <div className='p-1'>
                    <Gift className='size-6' />
                  </div>

                  <span className='font-medium text-base'>
                    Loyalty & Rewards
                  </span>

                  <Badge className='!rounded-full uppercase'>Premium</Badge>
                </Label>

                <Switch disabled id='loyalty-rewards' />
              </div>
            </Card.Content>
          </Card>
        </Fieldset>
      </Page.Content>
    </Page>
  )
}

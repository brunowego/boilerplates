import { NextResponse } from 'next/server'

import { client, RecipientsController } from '@/lib/pagarme'

export async function POST(): Promise<Response> {
  const recipientsController = new RecipientsController(client)

  try {
    const { result } = await recipientsController.createRecipient({
      name: 'Bruno Wesley Gomes Batista',
      email: 'brunowego@gmail.com',
      description: 'Recebedor da Henkiz Tecnologia',
      document: '01479506192',
      type: 'individual',
      defaultBankAccount: {
        holderName: 'Bruno Wesley Gomes Batista',
        holderType: 'individual',
        holderDocument: '01479506192',
        bank: '077',
        branchNumber: '0001',
        accountNumber: '2034550',
        accountCheckDigit: '0',
        type: 'checking',
        metadata: {},
      },
      metadata: {},
      // transferSettings: {},
      code: '3',
      paymentMode: 'bank_transfer',
      // registerInformation: {
      //   // name: 'Bruno Wesley Gomes Batista',
      //   // birthdate: '1985-09-27',
      //   // monthly_income: 20000,
      //   // professional_occupation: 'Desenvolvedor de Software',
      //   email: 'brunowego@gmail.com',
      //   document: '01479506192',
      //   type: 'individual',
      //   // siteUrl: '',
      //   phoneNumbers: [
      //     {
      //       ddd: '61',
      //       number: '982502595',
      //       type: 'mobile',
      //     },
      //   ],
      // },
    })

    return NextResponse.json(result, {
      status: 200,
    })
  } catch (err) {
    console.error(err)

    return new Response(null, {
      status: 500,
    })
  }
}

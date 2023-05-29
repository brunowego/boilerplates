import { Prisma, PrismaClient } from '@prisma/client'

const settingVariables: SettingVariables = {
  general: {
    appName: {
      description: 'Name of the application',
      type: 'string',
      defaultValue: 'ACME',
      secret: false,
    },
    appUrl: {
      description: 'On which URL ACME is available',
      type: 'string',
      defaultValue: 'http://127.0.0.1:3000',

      secret: false,
    },
    showHomePage: {
      description: 'Whether to show the home page',
      type: 'boolean',
      defaultValue: 'true',
      secret: false,
    },
  },
  share: {
    allowRegistration: {
      description: 'Whether registration is allowed',
      type: 'boolean',
      defaultValue: 'true',
      secret: false,
    },
    allowUnauthenticatedShares: {
      description: 'Whether unauthorized users can create shares',
      type: 'boolean',
      defaultValue: 'false',
      secret: false,
    },
    maxSize: {
      description: 'Maximum share size in bytes',
      type: 'number',
      defaultValue: '1073741824',
      secret: false,
    },
  },
  email: {
    enableShareEmailRecipients: {
      description:
        'Whether to allow emails to share recipients. Only enable this if you have enabled SMTP.',
      type: 'boolean',
      defaultValue: 'false',
      secret: false,
    },
    shareRecipientsSubject: {
      description: 'Subject of the email which gets sent to the share recipients.',
      type: 'string',
      defaultValue: 'Files shared with you',
    },
    shareRecipientsMessage: {
      description:
        'Message which gets sent to the share recipients.\n\nAvailable variables:\n{creator} - The username of the creator of the share\n{shareUrl} - The URL of the share\n{desc} - The description of the share\n{expires} - The expiration date of the share\n\nVariables will be replaced with the actual values.',
      type: 'text',
      defaultValue:
        'Hey!\n\n{creator} shared some files with you, view or download the files with this link: {shareUrl}\n\nThe share will expire {expires}.\n\nNote: {desc}\n\nShared securely with ACME',
    },
    reverseShareSubject: {
      description:
        'Subject of the email which gets sent when someone created a share with your reverse share link.',
      type: 'string',
      defaultValue: 'Reverse share link used',
    },
    reverseShareMessage: {
      description:
        "Message which gets sent when someone created a share with your reverse share link. {shareUrl} will be replaced with the creator's name and the share URL.",
      type: 'text',
      defaultValue:
        'Hey!\n\nA share was just created with your reverse share link: {shareUrl}\n\nShared securely with ACME',
    },
    resetPasswordSubject: {
      description: 'Subject of the email which gets sent when a user requests a password reset.',
      type: 'string',
      defaultValue: 'ACME password reset',
    },
    resetPasswordMessage: {
      description:
        'Message which gets sent when a user requests a password reset. {url} will be replaced with the reset password URL.',
      type: 'text',
      defaultValue:
        'Hey!\n\nYou requested a password reset. Click this link to reset your password: {url}\nThe link expires in a hour.\n\nACME',
    },
    inviteSubject: {
      description: 'Subject of the email which gets sent when an admin invites an user.',
      type: 'string',
      defaultValue: 'ACME invite',
    },
    inviteMessage: {
      description:
        'Message which gets sent when an admin invites an user. {url} will be replaced with the invite URL and {password} with the password.',
      type: 'text',
      defaultValue:
        'Hey!\n\nYou were invited to ACME. Click this link to accept the invite: {url}\n\nYour password is: {password}\n\nACME',
    },
  },
  smtp: {
    enabled: {
      description:
        'Whether SMTP is enabled. Only set this to true if you entered the host, port, email, user and password of your SMTP server.',
      type: 'boolean',
      defaultValue: 'true',
      secret: false,
    },
    host: {
      description: 'Host of the SMTP server',
      type: 'string',
      defaultValue: 'smtp.ethereal.email',
    },
    port: {
      description: 'Port of the SMTP server',
      type: 'number',
      defaultValue: '587',
    },
    email: {
      description: 'Email address which the emails get sent from',
      type: 'string',
      defaultValue: 'noreply@xyz.tld',
    },
    username: {
      description: 'Username of the SMTP server',
      type: 'string',
      defaultValue: '',
    },
    password: {
      description: 'Password of the SMTP server',
      type: 'string',
      defaultValue: '',
      obscured: true,
    },
  },
}

type SettingVariables = {
  [category: string]: {
    [variable: string]: Omit<Prisma.SettingCreateInput, 'name' | 'category' | 'order'>
  }
}

const prisma = new PrismaClient()

async function seedSettingVariables() {
  for (const [category, settingVariablesOfCategory] of Object.entries(settingVariables)) {
    let order = 0

    for (const [name, properties] of Object.entries(settingVariablesOfCategory)) {
      const existingSettingVariable = await prisma.setting.findUnique({
        where: { name_category: { name, category } },
      })

      if (!existingSettingVariable) {
        await prisma.setting.create({
          data: {
            order,
            name,
            ...properties,
            category,
          },
        })
      }
      order++
    }
  }
}

async function migrateSettingVariables() {
  const existingSettingVariables = await prisma.setting.findMany()

  for (const existingSettingVariable of existingSettingVariables) {
    const settingVariable =
      settingVariables[existingSettingVariable.category]?.[existingSettingVariable.name]

    if (!settingVariable) {
      await prisma.setting.delete({
        where: {
          name_category: {
            name: existingSettingVariable.name,
            category: existingSettingVariable.category,
          },
        },
      })
    } else if (
      JSON.stringify({
        ...settingVariable,
        name: existingSettingVariable.name,
        category: existingSettingVariable.category,
        value: existingSettingVariable.value,
      }) != JSON.stringify(existingSettingVariable)
    ) {
      await prisma.setting.update({
        where: {
          name_category: {
            name: existingSettingVariable.name,
            category: existingSettingVariable.category,
          },
        },
        data: {
          ...settingVariable,
          name: existingSettingVariable.name,
          category: existingSettingVariable.category,
          value: existingSettingVariable.value,
        },
      })
    }
  }
}

seedSettingVariables()
  .then(() => migrateSettingVariables())
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)

    await prisma.$disconnect()

    process.exit(1)
  })

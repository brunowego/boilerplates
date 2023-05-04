import { prisma, Prisma } from '../'
import * as crypto from 'crypto'

type SettingVariables = {
  [category: string]: {
    [variable: string]: Omit<Prisma.SettingCreateInput, 'name' | 'category' | 'order'>
  }
}

const settingVariables: SettingVariables = {
  auth: {
    jwtSecret: {
      description: 'Long random string used to sign JWT tokens',
      type: 'string',
      default_value: crypto.randomBytes(256).toString('base64'),
      locked: true,
    },
  },
  app: {
    name: {
      description: 'Name of the application',
      type: 'string',
      default_value: 'ACME',
      secret: false,
    },
    url: {
      description: 'On which URL ACME is available',
      type: 'string',
      default_value: 'http://localhost:3000',

      secret: false,
    },
    allowRegistration: {
      description: 'Whether registration is allowed',
      type: 'boolean',
      default_value: 'true',

      secret: false,
    },
  },
}

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

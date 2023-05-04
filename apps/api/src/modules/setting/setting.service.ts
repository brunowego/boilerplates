import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Setting } from '@acme/db'
import { PrismaService } from 'src/common/services/prisma.service'

@Injectable()
export class SettingService {
  constructor(
    @Inject('SETTING_VARIABLES') private settingVariables: Setting[],
    private prismaService: PrismaService
  ) {}

  get(key: `${string}.${string}`): any {
    const settingVariable = this.settingVariables.filter(
      (variable) => `${variable.category}.${variable.name}` == key
    )[0]

    if (!settingVariable) throw new Error(`Setting variable ${key} not found`)

    const value = settingVariable.value ?? settingVariable.defaultValue

    if (settingVariable.type == 'number') return parseInt(value)

    if (settingVariable.type == 'boolean') return value == 'true'

    if (settingVariable.type == 'string' || settingVariable.type == 'text') return value
  }

  async getByCategory(category: string) {
    const settingVariables = await this.prismaService.setting.findMany({
      orderBy: { order: 'asc' },
      where: { category, locked: { equals: false } },
    })

    return settingVariables.map((variable) => {
      return {
        ...variable,
        key: `${variable.category}.${variable.name}`,
        value: variable.value ?? variable.defaultValue,
      }
    })
  }

  async list() {
    const settingVariables = await this.prismaService.setting.findMany({
      where: { secret: { equals: false } },
    })

    return settingVariables.map((variable) => {
      return {
        ...variable,
        key: `${variable.category}.${variable.name}`,
        value: variable.value ?? variable.defaultValue,
      }
    })
  }

  async updateMany(data: { key: string; value: string | number | boolean }[]) {
    const response: Setting[] = []

    for (const variable of data) {
      response.push(await this.update(variable.key, variable.value))
    }

    return response
  }

  async update(key: string, value: string | number | boolean) {
    const settingVariable = await this.prismaService.setting.findUnique({
      where: {
        name_category: {
          category: key.split('.')[0],
          name: key.split('.')[1],
        },
      },
    })

    if (!settingVariable || settingVariable.locked)
      throw new NotFoundException('Setting variable not found')

    if (value === '') {
      value = null
    } else if (
      typeof value != settingVariable.type &&
      typeof value == 'string' &&
      settingVariable.type != 'text'
    ) {
      throw new BadRequestException(`Setting variable must be of type ${settingVariable.type}`)
    }

    const updatedVariable = await this.prismaService.setting.update({
      where: {
        name_category: {
          category: key.split('.')[0],
          name: key.split('.')[1],
        },
      },
      data: { value: value === null ? null : value.toString() },
    })

    this.settingVariables = await this.prismaService.setting.findMany()

    return updatedVariable
  }
}

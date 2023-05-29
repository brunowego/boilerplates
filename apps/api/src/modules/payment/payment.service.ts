import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/common/services/prisma.service'
import { CreatePaymentDto, PaymentDto } from './dtos'
// import { Prisma } from '@acme/db'

@Injectable()
export class PaymentService {
  constructor(private prismaService: PrismaService) {}

  async create(payment: CreatePaymentDto) {
    // try {
    return await this.prismaService.payment.create({
      data: {
        ...payment,
      },
    })
    // } catch (e) {
    //   if (e instanceof Prisma.PrismaClientKnownRequestError) {
    //     // if (e.code == 'P2002') {
    //     //   const duplicatedField: string = e.meta.target[0]
    //     //   throw new BadRequestException(`A user with this ${duplicatedField} already exists`)
    //     // }
    //   }
    // }
  }

  async getById(id: string): Promise<any> {
    return await this.prismaService.payment.findUnique({ where: { id } })
  }
}
